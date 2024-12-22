import express from "express";

import {
  ADMIN_SERVICE_URL,
  SUBMISSION_SERVICE_URL,
  USER_SERVICE_URL,
} from "@config/server-config";
import proxyRequest from "@config/proxy-middleware";

import verifyLogin, { optionalVerifyLogin } from "@/middlewares/verify-login";
import verifyRole from "@/middlewares/verify-role";

import authRouter from "@/routes/auth-route";
import { ADMIN, USER } from "@utils/constant";

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
