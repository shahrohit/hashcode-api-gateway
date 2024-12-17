import { Request as Req, Response as Res } from "express";

import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  NODE_ENV,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_MAX_AGE,
} from "@config/server-config";
import { generateToken } from "@utils/tokens";
import { DEV_ENV, REFRESH_TOKEN_NAME } from "@utils/constant";

const handleLoginResponse = (proxyRes: Req, req: Req, res: Res) => {
  let body = "";
  proxyRes.on("data", chunk => {
    body += chunk;
  });

  proxyRes.on("end", () => {
    try {
      const response = JSON.parse(body);

      if (proxyRes.statusCode !== 200) {
        res.status(proxyRes.statusCode ?? 500).json(response);
        return;
      }

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

      response.data.accessToken = accessToken;
      res.status(proxyRes.statusCode ?? 500).json(response);
    } catch (error) {
      throw error;
    }
  });
};

export default handleLoginResponse;
