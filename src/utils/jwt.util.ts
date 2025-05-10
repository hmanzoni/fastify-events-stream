import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config.js";
import { JwtPayload } from "../types/common/utils.js";
import { ForbiddenError } from "../errors/AuthErrors.js";

const { jwtSecret, configOptions } = jwtConfig;

export const createToken = async (user: JwtPayload) => {
  const token = jwt.sign(user, jwtSecret, configOptions);
  return token;
};

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new ForbiddenError("Invalid token");
  }
};
