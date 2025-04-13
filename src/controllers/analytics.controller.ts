import type { FastifyRequest, FastifyReply } from "fastify";
import { getTopEvents, getEventByUserId } from "../services/eventsCh.service.js";
import { DataLoggerKafka, KafkaLoggerProducer } from "../services/logger.service.js";
import { EventsEnumType } from "../models/event.model.js";

type TopEventsQuery = { topEvents: string | undefined };

// GET	/analytics/top-events	Get the most frequent events
export const events = async (request: FastifyRequest, reply: FastifyReply) => {
  let limitEvents: string;
  const { topEvents } = request.query as TopEventsQuery;
  limitEvents = topEvents || "10";
  const dataKafkaProducer: DataLoggerKafka = {
    request,
    userId: request.user.userId,
    serviceName: "analytics-top-events",
    actionType: EventsEnumType.topEvents,
    isSuccess: true,
  };
  try {
    const rows = await getTopEvents(limitEvents);
    await KafkaLoggerProducer(dataKafkaProducer);
    return reply.status(200).send({ topEvents: limitEvents, rows });
  } catch (error) {
    await KafkaLoggerProducer({ ...dataKafkaProducer, isSuccess: false });
    return reply.status(500).send({ message: error });
  }
};

type UserIdParams = { id: string };

// GET	/analytics/user/:id	Get the events from a specific user
export const user = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as UserIdParams;
  const dataKafkaProducer: DataLoggerKafka = {
    request,
    userId: request.user.userId,
    serviceName: "analytics-user-events",
    actionType: EventsEnumType.analyticsUser,
    isSuccess: true,
  };
  try {
    const rows = await getEventByUserId(id);
    await KafkaLoggerProducer(dataKafkaProducer);
    return reply.status(200).send({ eventId: id, rows: rows });
  } catch (error) {
    await KafkaLoggerProducer({ ...dataKafkaProducer, isSuccess: false });
    return reply.status(500).send({ message: error });
  }
};
