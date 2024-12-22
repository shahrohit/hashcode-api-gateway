import express from "express";

import authController from "@/controller/auth-controller";

const authRouter = express.Router();

authRouter.post("/refresh", authController.refreshAccessToken);
authRouter.post("/login", authController.loginProxy);
authRouter.post("/logout", authController.logout);
authRouter.post("/send-otp", authController.registerProxy);
authRouter.post("/verify", authController.registerProxy);
authRouter.post("/register", authController.registerProxy);

export default authRouter;
