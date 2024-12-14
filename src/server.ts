import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  NODE_ENV,
  PORT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_MAX_AGE,
} from "@config/server-config";
import apiRouter from "@routes/index";
import errorHandler from "@middlewares/errorHandler";
import socketIoProxy from "./middlewares/socket-proxy";
import passport from "passport";
import "@config/auth-provider";
import { generateToken } from "./utils/tokens";
import { DEV_ENV, REFRESH_TOKEN_NAME } from "./utils/strings";
import {
  googleAuth,
  googleAuthCallback,
} from "./middlewares/googleAuthentication";
import adminController from "./controller/authController";
import oAuthRouter from "./routes/oauth-route";
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);
// app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use("/socket.io", socketIoProxy);

app.use("/auth", oAuthRouter);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
