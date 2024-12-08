import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  NODE_ENV,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_MAX_AGE,
} from "@config/server-config";

import forwardRequest from "@utils/forwardRequest";
import { generateToken, verifyToken } from "@utils/tokens";
import { getAdminServiceURL, getUserServiceURL } from "@utils/getUrl";
import {
  ADMIN,
  DEV_ENV,
  LOGGED_OUT_MSG,
  REFRESH_TOKEN_NAME,
  TOKEN_REFESH_MSG,
} from "@utils/strings";

const register = async (req: Req, res: Res, next: NextFn) => {
  try {
    const account = req.query.account;
    const url =
      account === ADMIN
        ? getAdminServiceURL(req.originalUrl)
        : getUserServiceURL(req.originalUrl);

    const [response, status] = await forwardRequest(
      url,
      req.method,
      req.body,
      req.headers,
    );

    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Req, res: Res, next: NextFn) => {
  try {
    const account = req.query.account;
    const url =
      account === ADMIN
        ? getAdminServiceURL(req.originalUrl)
        : getUserServiceURL(req.originalUrl);

    const [response, status] = await forwardRequest(
      url,
      req.method,
      req.body,
      req.headers,
    );

    const refreshtoken = generateToken(
      { username: response.data.username, role: response.data.role },
      REFRESH_TOKEN,
      REFRESH_TOKEN_EXPIRY,
    );

    const accessToken = generateToken(
      { username: response.data.username, role: response.data.role },
      ACCESS_TOKEN,
      ACCESS_TOKEN_EXPIRY,
    );

    res.cookie(REFRESH_TOKEN_NAME, refreshtoken, {
      httpOnly: true,
      secure: NODE_ENV !== DEV_ENV,
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    response.data = {
      username: response.data.username,
      accessToken: accessToken,
    };
    res.status(status).json(response);
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

    // issue a new refresh token (token rotation)
    const newRefreshToken = generateToken(
      decode,
      REFRESH_TOKEN,
      REFRESH_TOKEN_EXPIRY,
    );

    // Update the refresh token in the cookie
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
      data: {
        username: decode.username,
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = (_: Req, res: Res) => {
  res.clearCookie(REFRESH_TOKEN_NAME);
  res.status(StatusCodes.OK).json({
    success: true,
    statusCode: StatusCodes.OK,
    message: LOGGED_OUT_MSG,
  });
};

const adminController = {
  register,
  login,
  refreshAccessToken,
  logout,
};

export default adminController;
