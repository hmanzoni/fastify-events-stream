import { PgConfig } from '../types/common/envConfig.js';
import envVars from './env.config.js';

export const pgConfig: PgConfig = {
  pass: envVars?.POSTGRES_PASSWORD || "P4SS_postgres",
  user: envVars?.POSTGRES_USER || "USERpostgres",
  name: envVars?.POSTGRES_DB || "events_stream",
  port: envVars?.POSTGRES_PORT || "5432",
};
