import type { FastifyRequest, FastifyReply } from "fastify";
import { getTopEvents, getEventByUserId } from "../services/eventsCh.service.js";

type TopEventsQuery = { topEvents: string | undefined }

// GET	/analytics/top-events	Get the most frequent events
export const events = async (request: FastifyRequest, reply: FastifyReply) =>{
  let limitEvents: string;
  const { topEvents } = request.query as TopEventsQuery;
  limitEvents = topEvents || "10";
  const rows = await getTopEvents(limitEvents);
  return reply.status(200).send({ topEvents: limitEvents, rows });
}

type UserIdParams = { id: string }

// GET	/analytics/user/:id	Get the events from a specific user
export const user = async (request: FastifyRequest, reply: FastifyReply) =>{
  const { id } = request.params as UserIdParams;
  const rows = await getEventByUserId(id);
  return reply.status(200).send({ eventId: id, rows: rows });
}
