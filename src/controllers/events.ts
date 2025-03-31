import type { FastifyRequest, FastifyReply } from "fastify";
import kaftaProducer from "../services/producer.service.ts";

// POST	/events	Recibir eventos y enviarlos a Kafka
export async function handleEvents(
  request: FastifyRequest,
  reply: FastifyReply
) {
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
  return reply.send({ hello: "world, from /events/recent" });
}

// GET	/events/:id	Obtener un evento específico
export async function getEvent(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  return reply.send({ hello: `world, from /events/${id}` });
}
