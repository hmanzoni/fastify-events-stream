import { DynConfig } from '../types/common/envConfig.js';
import envVars from './env.config.js';

export const dynConfig: DynConfig = {
  region: "us-east-1",
  protocol: envVars?.DYNAMODB_PROTOCOL || "http",
  port: envVars?.DYNAMODB_PORT || "8000",
  host: envVars?.DYNAMODB_HOST || "localhost",	
  tableName: envVars?.DYNAMODB_TABLE || "events",	
  accessKeyId: envVars?.DYNAMODB_KEY_ID || "fakeAccessKeyId",	
  secretAccessKey: envVars?.DYNAMODB_SECRET_KEY || "fakeSecretAccessKey",	
};