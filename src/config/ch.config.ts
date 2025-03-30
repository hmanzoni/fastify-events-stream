import {config, type DotenvParseOutput} from 'dotenv';

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new Error("Error loading environment variables");
}

export const chConfig = {
  pass: envVars?.CLICKHOUSE_PASSWORD,
  user: envVars?.CLICKHOUSE_USER,
  port: envVars?.CLICKHOUSE_PORT,
};