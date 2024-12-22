import cors from "cors";

import { ADMIN_URL, CLIENT_URL } from "@config/server-config";

const CORS = cors({
  origin: [CLIENT_URL, ADMIN_URL],
  credentials: true,
});

export default CORS;
