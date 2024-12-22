import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";

import { ROLE_HEADER } from "@utils/constant";
import { Forbidden } from "@utils/errors";

const verifyRole = (role: string) => (req: Req, _: Res, next: NextFn) => {
  const myRole = req.headers[ROLE_HEADER];
  if (role === myRole) next();
  else throw new Forbidden("ACCESS DENIED");
};

export default verifyRole;
