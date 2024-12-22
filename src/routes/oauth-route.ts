import express from "express";

import authController from "@/controller/auth-controller";
import {
  googleAuth,
  googleAuthCallback,
} from "@/middlewares/google-authentication";

const oAuthRouter = express.Router();

oAuthRouter.get("/google", googleAuth);
oAuthRouter.get("/google/callback", googleAuthCallback, authController.OAuth);

export default oAuthRouter;
