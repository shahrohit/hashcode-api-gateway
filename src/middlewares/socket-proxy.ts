import { WS_SERVICE_URL } from "@/config/server-config";
import { createProxyMiddleware } from "http-proxy-middleware";

const socketIoProxy = createProxyMiddleware({
  target: WS_SERVICE_URL, // Your WebSocket backend URL
  changeOrigin: true,
  ws: true, // Enable WebSocket proxying
});

export default socketIoProxy;
