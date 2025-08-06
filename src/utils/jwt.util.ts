import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config.js";
import { JwtPayload } from "../types/common/utils.js";
import { ForbiddenError } from "../errors/AuthErrors.js";

const { jwtLoginSecret, jwtRefreshSecret, configLoginOptions, configRefreshOptions } = jwtConfig;

export const createToken = async (user: JwtPayload, isRefesh: boolean = false) => {
  const secretJwt = isRefesh ? jwtRefreshSecret : jwtLoginSecret;
  const configOptions = isRefesh ? configRefreshOptions : configLoginOptions ;
  const token = jwt.sign(user, secretJwt, configOptions);
  return token;
};

export const verifyToken = async (token: string, isRefesh: boolean = false) => {
  try {
    const secretJwt = isRefesh ? jwtRefreshSecret : jwtLoginSecret;
    const decoded = jwt.verify(token, secretJwt) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new ForbiddenError("Invalid token");
  }
};
