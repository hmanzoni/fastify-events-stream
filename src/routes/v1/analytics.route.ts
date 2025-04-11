import type { FastifyInstance } from "fastify";
import { events, user } from './../../controllers/analytics.controller.js';

const routes = async (fastify: FastifyInstance)  => {
  // GET	/analytics/top-events	Get the most frequent events
  fastify.get("/top-events", events);

  // GET	/analytics/user/:id	Get the events from a specific user
  fastify.get("/user/:id", user);
}

export default routes;
