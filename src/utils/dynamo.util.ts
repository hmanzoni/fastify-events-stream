import { DynamoDBClient, type DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { dynConfig } from "../config/dynamo.config.js";

const { host, port, protocol, region, accessKeyId, secretAccessKey } = dynConfig;

const dynConfigOptions: DynamoDBClientConfig = {
  region: region,
  endpoint: `${protocol}://${host}:${port}`,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
};

const dynDb: DynamoDBClient = new DynamoDBClient(dynConfigOptions);

export default dynDb;
