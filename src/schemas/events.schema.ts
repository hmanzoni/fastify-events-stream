const description401 = "Unauthorized access";
const description403 = "Forbidden access";
const description500 = "Internal Server Error";

export const eventsSchema = {
  description: "Send custom events endpoint",
  tags: ["auth"],
  summary: "Create custom logs events",
  body: {
    type: "object",
    required: ["serviceName"],
    properties: {
      serviceName: { type: "string" }
    },
  },
  response: {
    201: {
      description: "Successful event creation",
      type: "object",
      properties: {
        message: { type: "string" },
        serviceName: { type: "object" },
      },
    },
    401: {
      description: "Unauthorized access",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    404: {
      description: "User not found",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    500: {
      description: "Internal Server Error",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const getRecentsSchema = {
  description: "Get the last events registered",
  tags: ["analytics"],
  summary: "Get the last events registered in DynamoDB",
  querystring: {
    type: "object",
    properties: {
      topEvents: { type: "string", default: "10" },
    },
  },
  response: {
    200: {
      description: "Successful get last events",
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

export const getEventSchema = {
  description: "Get an event endpoint",
  tags: ["analytics"],
  summary: "Get a specific event from DynamoDB",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Successful get the event",
      type: "object",
      properties: {
        message: { type: "string" },
        eventId: { type: "string" },
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
