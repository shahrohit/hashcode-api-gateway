import rateLimiter from "express-rate-limit";

import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW } from "@config/server-config";
import { RATE_LIMIT_MSG } from "@utils/strings";

const limiter = rateLimiter({
  windowMs: RATE_LIMIT_WINDOW * 60 * 1000,
  max: RATE_LIMIT_MAX,
  message: RATE_LIMIT_MSG,
});

export default limiter;
