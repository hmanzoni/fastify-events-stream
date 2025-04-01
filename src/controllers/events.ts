import type { FastifyRequest, FastifyReply } from "fastify";
import kaftaProducer from "../services/producer.service.ts";
import { getTopEvents, getEventById } from "../services/eventsCh.service.ts";

// POST	/events	Recibir eventos y enviarlos a Kafka
export async function handleEvents( request: FastifyRequest, reply: FastifyReply ) {
  const { eventType, userId, metadata } = request.body as {
    eventType: string;
    userId: string;
    metadata: any;
  };
  kaftaProducer({ eventType, userId, metadata });
  return reply.send({ hello: "world, from /events" });
}

// GET	/events/recent	Obtener los últimos eventos registrados
export async function getRecents(request: FastifyRequest, reply: FastifyReply) {
  let limitEvents;
  const { topEvents } = request.query as { topEvents: string | undefined };
  limitEvents = topEvents || "10";
  const rows = await getTopEvents(limitEvents);
  return reply.send({ topEvents: limitEvents, rows });
}

// GET	/events/:id	Obtener un evento específico
export async function getEvent(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const rows = await getEventById(id);
  return reply.send({ eventId: id, rows: rows });
}
