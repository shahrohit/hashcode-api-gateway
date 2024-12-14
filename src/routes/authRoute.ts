import express from "express";

import verifyLogin from "@middlewares/verifyLogin";
import authController from "@controller/authController";

const authRouter = express.Router();

authRouter.post("/send-otp", authController.register);
authRouter.post("/verify", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/refresh", authController.refreshAccessToken);

export default authRouter;
