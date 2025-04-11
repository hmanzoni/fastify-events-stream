import {config, type DotenvParseOutput} from 'dotenv';

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new Error("Error loading environment variables");
}

type DynConfig = {
  region: string;
  protocol: string;
  port: string;
  host: string;
  tableName: string;
};

export const dynConfig: DynConfig = {
  region: "us-east-1",
  protocol: envVars?.DYNAMODB_PROTOCOL || "http",
  port: envVars?.DYNAMODB_PORT || "8000",
  host: envVars?.DYNAMODB_HOST || "localhost",	
  tableName: envVars?.DYNAMODB_TABLE || "events",	
};