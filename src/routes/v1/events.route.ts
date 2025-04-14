import type { FastifyInstance } from "fastify";
import { handleEvents, getRecents, getEvent } from "../../controllers/events.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const routes = async (fastify: FastifyInstance) => {
  // POST	/events	send logs events to Kafka
  fastify.post("/", { preHandler: [authMiddleware] }, handleEvents);

  // GET	/events/recent	Get the last events registered
  fastify.get("/recent", { preHandler: [authMiddleware] }, getRecents);

  // GET	/events/:id get a specific event
  fastify.get("/:id", { preHandler: [authMiddleware] }, getEvent);
}

export default routes;
