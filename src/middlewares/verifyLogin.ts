import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";

import { ACCESS_TOKEN } from "@config/server-config";
import { verifyToken } from "@utils/tokens";
import { USERNAME_HEADER, ROLE_HEADER } from "@utils/strings";

const verifyLogin = async (req: Req, _: Res, next: NextFn) => {
  try {
    // verify the token
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decode = verifyToken(token, ACCESS_TOKEN);

    // set the headers
    req.headers[USERNAME_HEADER] = decode.username;
    req.headers[ROLE_HEADER] = decode.role;

    next();
  } catch (error) {
    next(error);
  }
};

// Optional Verification for the Users routes
// user can be logged in or can be guest user
const optionalVerifyLogin = async (req: Req, res: Res, next: NextFn) => {
  try {
    // Extract the token
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // for the logged in user else for the guest user
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
