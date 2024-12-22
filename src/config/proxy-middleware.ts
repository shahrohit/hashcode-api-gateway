import { createProxyMiddleware } from "http-proxy-middleware";

const proxyRequest = (SERVICE_URL: string, prefix: string = "api") =>
  createProxyMiddleware({
    target: `${SERVICE_URL}/${prefix}`,
    changeOrigin: true,
  });

export default proxyRequest;
