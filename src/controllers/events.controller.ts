import type { FastifyRequest, FastifyReply } from "fastify";
import kaftaProducer from "../services/producer.service.js";
import { getTopEvents, getEventById } from "../services/eventsDyn.service.js";

type HandleEventsBody = {
  event_type: string;
  user_id: string;
  metadata: any;
}

// POST	/events	send logs events to Kafka
export const handleEvents = async ( request: FastifyRequest, reply: FastifyReply ) =>{
  const { event_type, user_id, metadata } = request.body as HandleEventsBody;
  await kaftaProducer({ event_type, user_id, metadata: JSON.stringify(metadata), action_type: "save_logs" });
  return reply.status(201).send({response: "Event sent to Kafka", event_type, user_id, metadata});
}

type GetRecentsBody = { topEvents: string | undefined }

// GET	/events/recent	Get the last events registered
export const getRecents = async (request: FastifyRequest, reply: FastifyReply) =>{
  let limitEvents: string;
  const { topEvents } = request.query as GetRecentsBody;
  limitEvents = topEvents || "10";
  const rows = await getTopEvents(+limitEvents);
  return reply.status(200).send({ topEvents: limitEvents, rows });
}

type GetEventBody = { id: string }

// GET	/events/:id get a specific event
export const getEvent = async (request: FastifyRequest, reply: FastifyReply) =>{
  const { id } = request.params as GetEventBody;
  const rows = await getEventById(id);
  return reply.status(200).send({ eventId: id, rows: rows });
}
