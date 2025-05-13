const description401 = "Unauthorized access";
const description403 = "Forbidden access";
const description500 = "Internal Server Error";

export const eventsSchema = {
  description: "Frequent events endpoint",
  tags: ["analytics"],
  summary: "Get the most frequent events in Clickhouse",
  querystring: {
    type: "object",
    properties: {
      topEvents: { type: "string", default: "10" },
    },
  },
  response: {
    200: {
      description: "Successful get top events",
      type: "object",
      properties: {
        message: { type: "string" },
        topEvents: { type: "string" },
        rows: { type: "object" },
      },
    },
    403: {
      description: description403,
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    401: {
      description: description401,
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    500: {
      description: description500,
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const userSchema = {
  description: "Get user events endpoint",
  tags: ["analytics"],
  summary: "Get the events from a specific user",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Successful get events from user",
      type: "object",
      properties: {
        message: { type: "string" },
        userId: { type: "string" },
        rows: { type: "object" },
      },
    },
    403: {
      description: description403,
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    401: {
      description: description401,
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    500: {
      description: description500,
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
