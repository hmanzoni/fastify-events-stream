import {config, type DotenvParseOutput} from 'dotenv';

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new Error("Error loading environment variables");
}

export const pgConfig = {
  pass: envVars?.POSTGRES_PASSWORD,
  user: envVars?.POSTGRES_USER,
  name: envVars?.POSTGRES_DB,
  port: envVars?.POSTGRES_PORT,
};