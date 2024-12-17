import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";

import { ACCESS_TOKEN } from "@config/server-config";
import { verifyToken } from "@utils/tokens";
import {
  USERNAME_HEADER,
  ROLE_HEADER,
  AUTHORIZATION,
  BEARER,
} from "@utils/constant";

const verifyLogin = async (req: Req, _: Res, next: NextFn) => {
  try {
    const token = req.header(AUTHORIZATION)?.replace(BEARER, "");
    const decode = verifyToken(token, ACCESS_TOKEN);

    req.headers[USERNAME_HEADER] = decode.username;
    req.headers[ROLE_HEADER] = decode.role;

    next();
  } catch (error) {
    next(error);
  }
};

const optionalVerifyLogin = async (req: Req, _: Res, next: NextFn) => {
  try {
    const token = req.header(AUTHORIZATION)?.replace(BEARER, "");

    if (token) {
      const decode = verifyToken(token, ACCESS_TOKEN);
      req.headers[USERNAME_HEADER] = decode.username;
      req.headers[ROLE_HEADER] = decode.role;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyLogin;
export { optionalVerifyLogin };
