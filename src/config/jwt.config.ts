import { config, type DotenvParseOutput } from "dotenv";
import { JwtConfig } from "../types/common/envConfig.js";
import { EnvVarsNotFoundError } from "../errors/ConfigErrors.js";

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new EnvVarsNotFoundError("Error loading JWT environment variables");
}

export const jwtConfig: JwtConfig = {
  jwtSecret: envVars?.JWT_SECRET || "defaultSecret",
  configOptions: {
    expiresIn: "1h"
  }
};
