import { config, type DotenvParseOutput } from "dotenv";

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new Error("Error loading environment variables");
}

type ClickHouseConfig = {
  host: string;
  pass: string;
  user: string;
  port: string;
};

export const chConfig: ClickHouseConfig = {
  host: envVars?.CLICKHOUSE_HOST || "localhost",
  pass: envVars?.CLICKHOUSE_PASSWORD || "p4s5CH",
  user: envVars?.CLICKHOUSE_USER || "userCH",
  port: envVars?.CLICKHOUSE_PORT || "8123",
};
