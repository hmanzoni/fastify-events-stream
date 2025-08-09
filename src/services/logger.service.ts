import { EventKafkaDataSchema } from "../models/event.model.js";
import { default as kaftaProducer } from "./producer.service.js";
import { DataLoggerKafka, EventKafkaData } from "../types/events/kafka.js";
import { EventsEnumType, ResourceTypeMetadataKafka, ResultMetadataKafka } from "../types/events/event.enum.js";

const actionToResourceMap: Record<EventsEnumType, ResourceTypeMetadataKafka> = {
  [EventsEnumType.createUser]: ResourceTypeMetadataKafka.user,
  [EventsEnumType.deleteUser]: ResourceTypeMetadataKafka.user,
  [EventsEnumType.getProfile]: ResourceTypeMetadataKafka.user,
  [EventsEnumType.loginUser]: ResourceTypeMetadataKafka.auth,
  [EventsEnumType.logoutUser]: ResourceTypeMetadataKafka.auth,
  [EventsEnumType.refreshToken]: ResourceTypeMetadataKafka.auth,
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
      result: resultApi,
      service_name: serviceName,
      environment: process.env.ENVIRONMENT || "dev",
      version: process.env.VERSION || "1.0.0",
    },
  });
  return kafkaEvent;
}

export const KafkaLoggerProducer = async (dataLogger: DataLoggerKafka) => {
  const kafkaEvent = createKafkaEventData(dataLogger);
  await kaftaProducer(kafkaEvent);
};
