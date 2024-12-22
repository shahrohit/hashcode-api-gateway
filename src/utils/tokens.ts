import jwt from "jsonwebtoken";

import { Unauthorized } from "@utils/errors";

type TokenPayload = { username: string; role: string };

export const generateToken = (
  payload: TokenPayload,
  TOKEN_SECRET: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn });
};

export const verifyToken = (token: string | undefined, SECRET: string) => {
  if (!token) throw new Unauthorized("Access Denied");
  const decodedPayload = jwt.verify(token, SECRET) as jwt.JwtPayload;
  const decode: TokenPayload = {
    username: decodedPayload.username,
    role: decodedPayload.role,
  };
  return decode;
};
