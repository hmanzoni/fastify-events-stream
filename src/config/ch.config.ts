import { config, type DotenvParseOutput } from "dotenv";
import { ClickHouseConfig } from "../types/common/envConfig.js";

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new Error("Error loading environment variables");
}

export const chConfig: ClickHouseConfig = {
  host: envVars?.CLICKHOUSE_HOST || "localhost",
  pass: envVars?.CLICKHOUSE_PASSWORD || "p4s5CH",
  user: envVars?.CLICKHOUSE_USER || "userCH",
  port: envVars?.CLICKHOUSE_PORT || "8123",
};
