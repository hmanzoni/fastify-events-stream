import Fastify, { type FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import auth from "./routes/v1/auth.route.js";
import events from "./routes/v1/events.route.js";
import analytics from "./routes/v1/analytics.route.js";
import { swaggerIndex } from "./schemas/index.schema.js";

const { ADDRESS = "localhost", PORT = "3000" } = process.env;
const portNum: number = parseInt(PORT, 10);
const addressHost: string = ADDRESS == "0.0.0.0" ? "localhost" : ADDRESS;

const fastify: FastifyInstance = Fastify({
  logger: true,
});

const swaggerConfig = {
  ...swaggerIndex,
  swagger: {
    ...swaggerIndex.swagger,
    host: `${addressHost}:${PORT}`,
  },
};

fastify.register(swagger, swaggerConfig);
fastify.register(swaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});

fastify.register(auth, { prefix: "/api/v1/auth" });
fastify.register(events, { prefix: "/api/v1/events" });
fastify.register(analytics, { prefix: "/api/v1/analytics" });
fastify.get("/", async (request, reply) => {
  return { message: "Hello world!" };
});

fastify.listen({ host: ADDRESS, port: portNum }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
