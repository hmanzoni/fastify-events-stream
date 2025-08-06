import { config, type DotenvParseOutput } from "dotenv";
import { JwtConfig } from "../types/common/envConfig.js";
import { EnvVarsNotFoundError } from "../errors/ConfigErrors.js";

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new EnvVarsNotFoundError("Error loading JWT environment variables");
}

export const jwtConfig: JwtConfig = {
  jwtLoginSecret: envVars?.JWT_LOGIN_SECRET || "defaultSecret",
  jwtRefreshSecret: envVars?.JWT_REFRESH_SECRET || "defaultSecret",
  configRefreshOptions: {
    expiresIn: "7d"
  },
  configLoginOptions: {
    expiresIn: "15m"
  }
};
