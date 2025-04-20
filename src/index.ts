import Fastify, { type FastifyInstance } from "fastify";
import auth from "./routes/v1/auth.route.js";
import events from "./routes/v1/events.route.js";
import analytics from "./routes/v1/analytics.route.js";

const fastify: FastifyInstance = Fastify({
  logger: true,
});

fastify.register(auth, { prefix: "/api/v1/auth" });
fastify.register(events, { prefix: "/api/v1/events" });
fastify.register(analytics, { prefix: "/api/v1/analytics" });
fastify.get('/', async (request, reply) => {
  return { message: 'Hello world!' }
});

const { ADDRESS = 'localhost', PORT = '3000' } = process.env;

fastify.listen({ host: ADDRESS, port: parseInt(PORT, 10) }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
