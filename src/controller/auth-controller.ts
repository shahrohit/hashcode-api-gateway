import axios from "axios";
import { createProxyMiddleware } from "http-proxy-middleware";
import { StatusCodes } from "http-status-codes";

import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";

import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  ADMIN_SERVICE_URL,
  CLIENT_URL,
  NODE_ENV,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_MAX_AGE,
  USER_SERVICE_URL,
} from "@config/server-config";

import handleLoginResponse from "@controller/login-controller";

import { generateToken, verifyToken } from "@utils/tokens";
import {
  ADMIN,
  DEV_ENV,
  LOGGED_OUT_MSG,
  REFRESH_TOKEN_NAME,
  TOKEN_REFESH_MSG,
  USER,
} from "@utils/constant";
import { Forbidden } from "@/utils/errors";

const registerProxy = async (req: Req, res: Res, next: NextFn) => {
  try {
    const account = req.query.account;
    const targetUrl = account === ADMIN ? ADMIN_SERVICE_URL : USER_SERVICE_URL;

    return createProxyMiddleware({
      target: `${targetUrl}/api/auth`,
      changeOrigin: true,
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

const loginProxy = async (req: Req, res: Res, next: NextFn) => {
  try {
    const account = req.query.account;
    const targetUrl = account === ADMIN ? ADMIN_SERVICE_URL : USER_SERVICE_URL;

    return createProxyMiddleware({
      target: `${targetUrl}/api/auth`,
      changeOrigin: true,
      selfHandleResponse: true,
      on: {
        proxyRes: handleLoginResponse,
      },
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req: Req, res: Res, next: NextFn) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const decode = verifyToken(refreshToken, REFRESH_TOKEN);

    const newAccessToken = generateToken(
      decode,
      ACCESS_TOKEN,
      ACCESS_TOKEN_EXPIRY,
    );

    const newRefreshToken = generateToken(
      decode,
      REFRESH_TOKEN,
      REFRESH_TOKEN_EXPIRY,
    );
    let user: { [name: string]: string } = {};
    if (decode.role === "User") {
      const response = await axios.get(
        `${USER_SERVICE_URL}/api/users/${decode.username}`,
      );
      user = response.data.data;
      user.accessToken = newAccessToken;
    } else if (decode.role === "Admin") {
      user = {
        username: "ADMIN",
        accessToken: newAccessToken,
      };
    } else {
      throw new Forbidden("Invalid User");
    }

    res.cookie(REFRESH_TOKEN_NAME, newRefreshToken, {
      httpOnly: true,
      secure: NODE_ENV !== DEV_ENV,
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: TOKEN_REFESH_MSG,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (_: Req, res: Res, next: NextFn) => {
  try {
    res.clearCookie(REFRESH_TOKEN_NAME, {
      httpOnly: true,
      secure: NODE_ENV !== DEV_ENV,
      sameSite: "strict",
    });
    res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: LOGGED_OUT_MSG,
    });
  } catch (error) {
    next(error);
  }
};

const OAuth = (req: Req, res: Res, next: NextFn) => {
  try {
    const user = req.user as { username: string };
    const refreshtoken = generateToken(
      { username: user.username, role: USER },
      REFRESH_TOKEN,
      REFRESH_TOKEN_EXPIRY,
    );

    res.cookie(REFRESH_TOKEN_NAME, refreshtoken, {
      httpOnly: true,
      secure: NODE_ENV !== DEV_ENV,
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
    res.redirect(CLIENT_URL);
  } catch (error) {
    next(error);
  }
};

const adminController = {
  registerProxy,
  loginProxy,
  refreshAccessToken,
  logout,
  OAuth,
};

export default adminController;
