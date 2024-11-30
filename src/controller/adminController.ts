import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";

import { getAdminServiceURL } from "@utils/getUrl";
import forwardRequest from "@utils/forwardRequest";

const adminController = async (req: Req, res: Res, next: NextFn) => {
  try {
    const url = getAdminServiceURL(req.originalUrl);
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

export default adminController;
