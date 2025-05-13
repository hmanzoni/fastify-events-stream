import type { FastifyRequest, FastifyReply } from "fastify";
import { getTopEvents, getEventByUserId } from "../services/eventsCh.service.js";
import { KafkaLoggerProducer } from "../services/logger.service.js";
import { DataLoggerKafka } from "../types/events/kafka.js";
import { EventsEnumType } from "../types/events/event.enum.js";
import { TopEventsQuery, UserIdParams } from "../types/events/events.js";

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
    return reply.status(200).send({ message: "Successful retrieving the last events", topEvents: limitEvents, rows });
  } catch (error) {
    await KafkaLoggerProducer({ ...dataKafkaProducer, isSuccess: false });
    return reply.status(500).send({ message: error });
  }
};

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
    return reply.status(200).send({ message: "Successful retrieving the event from a user", userId: id, rows: rows });
  } catch (error) {
    await KafkaLoggerProducer({ ...dataKafkaProducer, isSuccess: false });
    return reply.status(500).send({ message: error });
  }
};
