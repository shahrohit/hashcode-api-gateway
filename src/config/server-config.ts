import dotenv from "dotenv";
dotenv.config();

import { DEV_ENV } from "@utils/strings";

export const PORT = +(process.env.PORT || 4000);
export const NODE_ENV = process.env.NODE_ENV || DEV_ENV;
export const RATE_LIMIT_WINDOW = +(process.env.RATE_LIMIT_WINDOW || 15);
export const RATE_LIMIT_MAX = +(process.env.RATE_LIMIT_MAX || 100);

export const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m";

export const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;
export const REFRESH_TOKEN_DAY = +(process.env.REFRESH_TOKEN_DAY || 7);
export const REFRESH_TOKEN_EXPIRY = `${REFRESH_TOKEN_DAY}d`;
export const REFRESH_TOKEN_MAX_AGE = REFRESH_TOKEN_DAY * 24 * 60 * 60 * 1000;

export const ADMIN_SERVICE_URL = process.env.ADMIN_SERVICE_URL!;
export const USER_SERVICE_URL = process.env.USER_SERVICE_URL!;
export const SUBMISSION_SERVICE_URL = process.env.SUBMISSION_SERVICE_URL!;
