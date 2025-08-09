import { ClickHouseConfig } from "../types/common/envConfig.js";
import envVars from "./env.config.js";

export const chConfig: ClickHouseConfig = {
  host: envVars?.CLICKHOUSE_HOST || "localhost",
  pass: envVars?.CLICKHOUSE_PASSWORD || "p4s5CH",
  user: envVars?.CLICKHOUSE_USER || "userCH",
  port: envVars?.CLICKHOUSE_PORT || "8123",
};
