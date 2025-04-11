import { config, type DotenvParseOutput } from "dotenv";
import { type SignOptions } from "jsonwebtoken";

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new Error("Error loading environment variables");
}

type JwtConfig = {
  jwtSecret: string ;
  configOptions: SignOptions;
};

export const jwtConfig: JwtConfig = {
  jwtSecret: envVars?.JWT_SECRET || "defaultSecret",
  configOptions: {
    expiresIn: "1h"
  }
};
