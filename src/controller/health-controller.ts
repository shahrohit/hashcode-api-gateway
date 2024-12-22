import httpStatusCode from "http-status-codes";
import {
  Request as Req,
  Response as Res,
  NextFunction as NexFn,
} from "express";

const checkHealth = (_: Req, res: Res, next: NexFn) => {
  try {
    res.status(httpStatusCode.OK).json({
      message: "Server is Up",
    });
  } catch (error) {
    next(error);
  }
};

export default checkHealth;
