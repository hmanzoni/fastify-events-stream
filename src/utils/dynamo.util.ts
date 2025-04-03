import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { dynConfig } from "../config/dynamo.config.js";

const dynDb = new DynamoDB({ region: dynConfig.region, endpoint: `${dynConfig.protocol}://${dynConfig.host}:${dynConfig.port}` });

export default dynDb;
