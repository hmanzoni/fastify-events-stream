import { type FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import { type FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export const swaggerIndex: FastifyDynamicSwaggerOptions = {
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
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      Authorization: {
        description: 'Authorization header token, sample: "Bearer #TOKEN#"',
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    tags: [
      { name: "auth", description: "Authentication related endpoints" },
      { name: "events", description: "Event logging and analysis" },
      { name: "analytics", description: "Analytics from the databases" },
    ],
  },
};

export const swaggerUiConfig: FastifySwaggerUiOptions = {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
};
