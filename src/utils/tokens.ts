import jwt from "jsonwebtoken";
import { Unauthorized } from "./errors";

export const generateToken = (
  payload: any,
  TOKEN_SECRET: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn });
};

export const verifyToken = (token: any, SECRET: string) => {
  if (!token) throw new Unauthorized("Access Denied");
  const { email, role } = jwt.verify(token, SECRET) as jwt.JwtPayload;
  return { email, role } as { email: string; role: string };
};
