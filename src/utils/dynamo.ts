import AWS from "aws-sdk";
import { dynConfig } from "../config/dynamo.config.ts";

AWS.config.update({
  region: dynConfig.region,
});

const dynDb = new AWS.DynamoDB({ endpoint: `${dynConfig.protocol}://${dynConfig.host}:${dynConfig.port}` });

export default dynDb;
