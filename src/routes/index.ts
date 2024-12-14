import express from "express";

import authRouter from "@routes/authRoute";
import verifyLogin, { optionalVerifyLogin } from "@middlewares/verifyLogin";
import verifyRole from "@middlewares/verifyRole";
import userController from "@controller/userController";
import adminController from "@controller/adminController";
import submissionController from "@controller/submissionController";
import { ADMIN, USER } from "@utils/strings";
import bodyParser from "body-parser";
import proxyRequest from "@/config/proxy-middleware";
import {
  ADMIN_SERVICE_URL,
  SUBMISSION_SERVICE_URL,
  USER_SERVICE_URL,
} from "@/config/server-config";
const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

apiRouter.all("/users/*", optionalVerifyLogin, proxyRequest(USER_SERVICE_URL));

apiRouter.all(
  "/admin/*",
  verifyLogin,
  verifyRole(ADMIN),
  proxyRequest(ADMIN_SERVICE_URL),
);

apiRouter.all(
  "/submissions/*",
  verifyLogin,
  verifyRole(USER),
  proxyRequest(SUBMISSION_SERVICE_URL),
);

export default apiRouter;
