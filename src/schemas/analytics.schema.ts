import { FastifySchema } from "fastify";
import { headersJsonSchema } from "./headers.schema.js";
import { errorResponseSchema } from "./response.schema.js";

const tags = ["analytics"];

export const eventsSchema: FastifySchema = {
  description: "Frequent events endpoint",
  tags,
  summary: "Get the most frequent events in Clickhouse",
  headers: headersJsonSchema,
  querystring: {
    type: "object",
    properties: {
      topEvents: { type: "string", default: "10" },
    },
  },
  response: {
    ...errorResponseSchema,
    200: {
      description: "Successful get top events",
      type: "object",
      properties: {
        message: { type: "string" },
        topEvents: { type: "string" },
        rows: { type: "array" },
      },
    },
  },
};

export const userSchema: FastifySchema = {
  description: "Get user events endpoint",
  tags,
  summary: "Get the events from a specific user",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  headers: headersJsonSchema,
  response: {
    ...errorResponseSchema,
    200: {
      description: "Successful get events from user",
      type: "object",
      properties: {
        message: { type: "string" },
        userId: { type: "string" },
        rows: { type: "array" },
      },
    },
  },
};
