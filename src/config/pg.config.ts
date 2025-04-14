import {config, type DotenvParseOutput} from 'dotenv';
import { PgConfig } from '../types/common/envConfig.js';

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new Error("Error loading environment variables");
}

export const pgConfig: PgConfig = {
  pass: envVars?.POSTGRES_PASSWORD || "P4SS_postgres",
  user: envVars?.POSTGRES_USER || "USERpostgres",
  name: envVars?.POSTGRES_DB || "events_stream",
  port: envVars?.POSTGRES_PORT || "5432",
};
