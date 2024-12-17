import jwt from "jsonwebtoken";

import { Unauthorized } from "@utils/errors";

export const generateToken = (
  payload: any,
  TOKEN_SECRET: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn });
};

export const verifyToken = (token: any, SECRET: string) => {
  if (!token) throw new Unauthorized("Access Denied");
  const { username, role } = jwt.verify(token, SECRET) as jwt.JwtPayload;
  return { username, role } as { username: string; role: string };
};
