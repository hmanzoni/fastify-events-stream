import { type FastifyRequest } from "fastify";
import {
  EventKafkaDataSchema,
  EventsEnumType,
  ResourceTypeMetadataKafka,
  ResultMetadataKafka,
} from "../models/event.model.js";
import kaftaProducer, { EventKafkaData } from "./producer.service.js";

export type DataLoggerKafka = {
  request: FastifyRequest;
  userId: string;
  serviceName: string;
  actionType: EventsEnumType;
  isSuccess: boolean;
}

const actionToResourceMap: Record<EventsEnumType, ResourceTypeMetadataKafka> = {
  [EventsEnumType.createUser]: ResourceTypeMetadataKafka.user,
  [EventsEnumType.deleteUser]: ResourceTypeMetadataKafka.user,
  [EventsEnumType.getProfile]: ResourceTypeMetadataKafka.user,
  [EventsEnumType.loginUser]: ResourceTypeMetadataKafka.auth,
  [EventsEnumType.logoutUser]: ResourceTypeMetadataKafka.auth,
  [EventsEnumType.topEvents]: ResourceTypeMetadataKafka.analytics,
  [EventsEnumType.analyticsUser]: ResourceTypeMetadataKafka.analytics,
  [EventsEnumType.createEvent]: ResourceTypeMetadataKafka.events,
  [EventsEnumType.saveLogs]: ResourceTypeMetadataKafka.events,
  [EventsEnumType.recentEvents]: ResourceTypeMetadataKafka.events,
  [EventsEnumType.getEvent]: ResourceTypeMetadataKafka.events

};

const selectResourceType = (actionType: EventsEnumType): ResourceTypeMetadataKafka => {
  return actionToResourceMap[actionType] ?? ResourceTypeMetadataKafka.events;
};

const createKafkaEventData = (dataLogger: DataLoggerKafka) => {
  const { request, userId, serviceName, actionType, isSuccess } = dataLogger;
  const resourceType = selectResourceType(actionType);
  const resultApi = isSuccess
    ? ResultMetadataKafka.success
    : ResultMetadataKafka.failure;

  const kafkaEvent: EventKafkaData = EventKafkaDataSchema.parse({
    user_id: userId,
    action_type: actionType,
    metadata: {
      ip_address: request.ip,
      user_agent: request.headers["user-agent"],
      resource_type: resourceType,
      timestamp: new Date().toISOString(),
      result: resultApi,
      service_name: serviceName,
      environment: process.env.ENVIRONMENT,
      version: process.env.VERSION,
    },
  });
  return kafkaEvent;
}

export const KafkaLoggerProducer = async (dataLogger: DataLoggerKafka) => {
  const kafkaEvent = createKafkaEventData(dataLogger);
  await kaftaProducer(kafkaEvent);
};
