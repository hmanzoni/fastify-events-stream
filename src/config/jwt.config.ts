import { config, type DotenvParseOutput } from "dotenv";
import { JwtConfig } from "../types/common/envConfig.js";

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new Error("Error loading environment variables");
}


export const jwtConfig: JwtConfig = {
  jwtSecret: envVars?.JWT_SECRET || "defaultSecret",
  configOptions: {
    expiresIn: "1h"
  }
};
