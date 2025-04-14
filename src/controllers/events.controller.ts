import type { FastifyRequest, FastifyReply } from "fastify";
import { getTopEvents, getEventById } from "../services/eventsDyn.service.js";
import { DataLoggerKafka, KafkaLoggerProducer } from "../services/logger.service.js";
import { EventsEnumType } from "../models/event.model.js";

type HandleEventsBody = {
  serviceName: string;
}

// POST	/events	send logs events to Kafka
export const handleEvents = async ( request: FastifyRequest, reply: FastifyReply ) =>{
  const { serviceName } = request.body as HandleEventsBody;
  const dataKafkaProducer: DataLoggerKafka = {request, userId: request.user.userId, serviceName: `create-event-${serviceName}`, actionType: EventsEnumType.saveLogs, isSuccess: true};
  await KafkaLoggerProducer(dataKafkaProducer);
  return reply.status(201).send({response: "Event sent to Kafka", serviceName: dataKafkaProducer.serviceName});
}

type GetRecentsQuery = { topEvents: string | undefined }

// GET	/events/recent	Get the last events registered
export const getRecents = async (request: FastifyRequest, reply: FastifyReply) =>{
  let limitEvents: string;
  const { topEvents } = request.query as GetRecentsQuery;

  limitEvents = topEvents || "10";
  const dataKafkaProducer: DataLoggerKafka = {request, userId: request.user.userId, serviceName: "recent-events", actionType: EventsEnumType.recentEvents, isSuccess: true};
  try {
    const rows = await getTopEvents(+limitEvents);
    await KafkaLoggerProducer(dataKafkaProducer);
    return reply.status(200).send({ topEvents: limitEvents, rows });
  } catch (error) {
    await KafkaLoggerProducer({...dataKafkaProducer, isSuccess: false});
    return reply.status(500).send({ message: error });
  }
}

type GetEventParams = { id: string }

// GET	/events/:id get a specific event
export const getEvent = async (request: FastifyRequest, reply: FastifyReply) =>{
  const { id } = request.params as GetEventParams;
  const dataKafkaProducer: DataLoggerKafka = {request, userId: request.user.userId, serviceName: "get-event", actionType: EventsEnumType.getEvent, isSuccess: true};
  try {
    const rows = await getEventById(id);
    await KafkaLoggerProducer(dataKafkaProducer);
    return reply.status(200).send({ eventId: id, rows: rows });
  } catch (error) {
    await KafkaLoggerProducer({...dataKafkaProducer, isSuccess: false});
    return reply.status(500).send({ message: error });
  }
}
