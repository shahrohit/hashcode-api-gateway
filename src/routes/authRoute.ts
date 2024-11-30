import express from "express";

import verifyLogin from "@middlewares/verifyLogin";
import authController from "@controller/authController";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", verifyLogin, authController.logout);
authRouter.post("/refresh", authController.refreshAccessToken);

export default authRouter;
