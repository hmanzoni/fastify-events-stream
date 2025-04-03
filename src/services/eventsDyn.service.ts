import {
  PutItemCommand,
  QueryCommand,
  ScanCommand,
  type PutItemCommandInput,
  type QueryCommandInput,
  type ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import dynDb from "../utils/dynamo.util.js";
import { dynConfig } from "../config/dynamo.config.js";

const { tableName } = dynConfig;

// Get top 10 events
export const getTopEvents = async (limit: number = 10) => {
  const params: ScanCommandInput = {
    TableName: tableName,
    Limit: limit,
  };

  const command = new ScanCommand(params);
  const response = await dynDb.send(command);
  return response.Items;
};

// Get event by ID
export const getEventById = async (eventId: string) => {
  const params: QueryCommandInput = {
    TableName: tableName,
    KeyConditions: {
      event_id: {
        AttributeValueList: [{ S: eventId }],
        ComparisonOperator: "EQ",
      },
    },
  };

  const command = new QueryCommand(params);
  const response = await dynDb.send(command);
  return response.Items;
};

// Create an event
export const createEvent = async (eventId: string, userId: string) => {
  const timeStampValue = new Date().getTime().toString(); // Convert timestamp to string
  const params: PutItemCommandInput = {
    TableName: tableName,
    Item: {
      event_id: { S: eventId },
      timestamp: { N: timeStampValue },
      user_id: { S: userId },
    },
  };

  const command = new PutItemCommand(params);
  await dynDb.send(command);
  return { status: "success", message: "Event inserted successfully" };
};
