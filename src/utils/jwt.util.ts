import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config.ts";

export const createToken = async (user: { username: string; email: string; }) => {
  const token = jwt.sign(
    { username: user.username, email: user.email },
    jwtConfig.jwtSecret,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.jwtSecret) as {
      username: string;
      email: string;
    };
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
