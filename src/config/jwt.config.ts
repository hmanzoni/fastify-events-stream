import { JwtConfig } from "../types/common/envConfig.js";
import envVars from "./env.config.js";

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
