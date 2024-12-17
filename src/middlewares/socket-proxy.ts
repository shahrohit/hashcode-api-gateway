import { createProxyMiddleware } from "http-proxy-middleware";

import { WS_SERVICE_URL } from "@config/server-config";

const socketIoProxy = createProxyMiddleware({
  target: WS_SERVICE_URL, // Your WebSocket backend URL
  changeOrigin: true,
  ws: true, // Enable WebSocket proxying
});

export default socketIoProxy;
