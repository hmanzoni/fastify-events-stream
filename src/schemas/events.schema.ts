import { FastifySchema } from "fastify";
import { headersJsonSchema } from "./headers.schema.js";
import { errorResponseSchema } from "./response.schema.js";

const tags = ["events"];

export const eventsSchema: FastifySchema = {
  description: "Send custom events endpoint",
  tags,
  summary: "Create custom logs events",
  body: {
    type: "object",
    required: ["serviceName"],
    properties: {
      serviceName: { type: "string" },
    },
  },
  headers: headersJsonSchema,
  response: {
    ...errorResponseSchema,
    201: {
      description: "Successful event creation",
      type: "object",
      properties: {
        message: { type: "string" },
        serviceName: { type: "string" },
      },
    },
  },
};

export const getRecentsSchema: FastifySchema = {
  description: "Get the last events registered",
  tags,
  summary: "Get the last events registered in DynamoDB",
  querystring: {
    type: "object",
    properties: {
      topEvents: { type: "string", default: "10" },
    },
  },
  headers: headersJsonSchema,
  response: {
    ...errorResponseSchema,
    200: {
      description: "Successful get last events",
      type: "object",
      properties: {
        message: { type: "string" },
        topEvents: { type: "string" },
        rows: { type: "array" },
      },
    },
  },
};

export const getEventSchema: FastifySchema = {
  description: "Get an event endpoint",
  tags,
  summary: "Get a specific event from DynamoDB",
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
      description: "Successful get the event",
      type: "object",
      properties: {
        message: { type: "string" },
        eventId: { type: "string" },
        rows: { type: "array" },
      },
    },
  },
};
