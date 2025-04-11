import type { FastifyInstance } from "fastify";
import { handleEvents, getRecents, getEvent } from "../../controllers/events.controller.js";

const routes = async (fastify: FastifyInstance) => {
  // POST	/events	send logs events to Kafka
  fastify.post("/", handleEvents);

  // GET	/events/recent	Get the last events registered
  fastify.get("/recent", getRecents);

  // GET	/events/:id get a specific event
  fastify.get("/:id", getEvent);
}

export default routes;
