import type { FastifyInstance } from "fastify";
import { events, user } from './../../controllers/analytics.js';

async function routes(fastify: FastifyInstance, options: Object) {
  // GET	/analytics/top-events	Obtener los eventos más frecuentes
  fastify.get("/top-events", events);

  // GET	/analytics/user/:id	Consultar eventos de un usuario específico
  fastify.get("/user/:id", user);
}

export default routes;
