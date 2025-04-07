import type { FastifyRequest, FastifyReply } from "fastify";
import kaftaProducer from "../services/producer.service.js";
import { getTopEvents, getEventById } from "../services/eventsDyn.service.js";

// POST	/events	Recibir eventos y enviarlos a Kafka
export async function handleEvents( request: FastifyRequest, reply: FastifyReply ) {
  const { event_type, user_id, metadata } = request.body as {
    event_type: string;
    user_id: string;
    metadata: any;
  };
  await kaftaProducer({ event_type, user_id, metadata: JSON.stringify(metadata), action_type: "save_logs" });
  return reply.status(201).send({response: "Event sent to Kafka", event_type, user_id, metadata});
}

// GET	/events/recent	Obtener los últimos eventos registrados
export async function getRecents(request: FastifyRequest, reply: FastifyReply) {
  let limitEvents;
  const { topEvents } = request.query as { topEvents: string | undefined };
  limitEvents = topEvents || "10";
  const rows = await getTopEvents(+limitEvents);
  return reply.status(200).send({ topEvents: limitEvents, rows });
}

// GET	/events/:id	Obtener un evento específico
export async function getEvent(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const rows = await getEventById(id);
  return reply.status(200).send({ eventId: id, rows: rows });
}
