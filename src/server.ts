import express from "express";
import http from "http";
import cookieParser from "cookie-parser";

import { PORT } from "@config/server-config";
import "@config/auth-provider";

import CORS from "@middlewares/cors-middleware";
import limiter from "@middlewares/limiter";
import socketIoProxy from "@middlewares/socket-proxy";
import errorHandler from "@middlewares/error-handler";

import apiRouter from "@routes/index";
import oAuthRouter from "@routes/oauth-route";

const app = express();
const server = http.createServer(app);

app.use(CORS);
app.use(limiter);
app.use(cookieParser());

app.use("/api", apiRouter);
app.use("/socket.io", socketIoProxy);

app.use("/auth", oAuthRouter);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
