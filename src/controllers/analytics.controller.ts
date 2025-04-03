import type { FastifyRequest, FastifyReply } from "fastify";
import { getTopEvents, getEventById } from "../services/eventsCh.service.js";

// GET	/analytics/top-events	Obtener los eventos más frecuentes
export async function events(request: FastifyRequest, reply: FastifyReply) {
  let limitEvents;
  const { topEvents } = request.query as { topEvents: string | undefined };
  limitEvents = topEvents || "10";
  const rows = await getTopEvents(limitEvents);
  return reply.status(200).send({ topEvents: limitEvents, rows });
}

// GET	/analytics/user/:id	Consultar eventos de un usuario específico
export async function user(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const rows = await getEventById(id);
  return reply.status(200).send({ eventId: id, rows: rows });
}
