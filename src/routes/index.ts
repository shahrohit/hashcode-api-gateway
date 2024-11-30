import express from "express";

import authRouter from "@routes/authRoute";
import verifyLogin, { optionalVerifyLogin } from "@middlewares/verifyLogin";
import verifyRole from "@middlewares/verifyRole";
import userController from "@controller/userController";
import adminController from "@controller/adminController";
import submissionController from "@controller/submissionController";
import { ADMIN, USER } from "@utils/strings";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

apiRouter.all("/users/*", optionalVerifyLogin, userController);

apiRouter.all("/admin/*", verifyLogin, verifyRole(ADMIN), adminController);

apiRouter.all(
  "/submissions/*",
  verifyLogin,
  verifyRole(USER),
  submissionController,
);

export default apiRouter;
