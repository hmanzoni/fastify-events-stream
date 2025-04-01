import {config, type DotenvParseOutput} from 'dotenv';

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new Error("Error loading environment variables");
}

export const dynConfig = {
  region: "us-east-1",
  protocol: envVars?.DYNAMODB_PROTOCOL || "http",
  port: envVars?.DYNAMODB_PORT || "8000",
  host: envVars?.DYNAMODB_HOST || "localhost",	
};