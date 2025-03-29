import type { FastifyInstance } from "fastify";
import { handleEvents, getRecents, getEvent } from "../../controllers/events.js";

async function routes(fastify: FastifyInstance, options: Object) {
  // POST	/events	Recibir eventos y enviarlos a Kafka
  fastify.post("/", handleEvents);

  // GET	/events/recent	Obtener los últimos eventos registrados
  fastify.get("/recent", getRecents);

  // GET	/events/:id	Obtener un evento específico
  fastify.get("/:id", getEvent);
}

export default routes;
