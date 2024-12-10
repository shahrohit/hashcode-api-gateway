import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import { PORT } from "@config/server-config";
import apiRouter from "@routes/index";
import errorHandler from "@middlewares/errorHandler";
import socketIoProxy from "./middlewares/socket-proxy";

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use("/socket.io", socketIoProxy);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
