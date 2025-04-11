import { DynamoDB, type DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { dynConfig } from "../config/dynamo.config.js";

const { host, port, protocol, region } = dynConfig;

const dynConfigOptions: DynamoDBClientConfig = {
  region: region,
  endpoint: `${protocol}://${host}:${port}`,
};

const dynDb: DynamoDB = new DynamoDB(dynConfigOptions);

export default dynDb;
