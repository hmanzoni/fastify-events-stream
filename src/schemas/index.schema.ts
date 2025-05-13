export const swaggerIndex = {
  swagger: {
    info: {
      title: "Fastify Events API",
      description: "API for logging and analyzing events",
      version: "1.0.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "auth", description: "Authentication related endpoints" },
      { name: "events", description: "Event logging and analysis" },
      { name: "analytics", description: "Analytics from the databases" },
    ],
  },
};
