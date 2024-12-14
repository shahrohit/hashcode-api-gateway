import adminController from "@/controller/authController";
import {
  googleAuth,
  googleAuthCallback,
} from "@/middlewares/googleAuthentication";
import express from "express";
const oAuthRouter = express.Router();

oAuthRouter.get("/google", googleAuth);
oAuthRouter.get("/google/callback", googleAuthCallback, adminController.OAuth);

export default oAuthRouter;
