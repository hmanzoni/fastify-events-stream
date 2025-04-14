import type { FastifyInstance } from "fastify";
import { events, user } from './../../controllers/analytics.controller.js';
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const routes = async (fastify: FastifyInstance)  => {
  // GET	/analytics/top-events	Get the most frequent events
  fastify.get("/top-events", { preHandler: [authMiddleware] }, events);

  // GET	/analytics/user/:id	Get the events from a specific user
  fastify.get("/user/:id", { preHandler: [authMiddleware] }, user);
}

export default routes;
