import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";

import { ROLE_HEADER } from "@utils/strings";
import { Unauthorized } from "@utils/errors";

// Role bases Verification
const verifyRole = (role: string) => (req: Req, _: Res, next: NextFn) => {
  const myRole = req.headers[ROLE_HEADER];
  if (role === myRole) next();
  else throw new Unauthorized("ACCESS DENIED");
};

export default verifyRole;
