import { FastifyRequest } from "fastify";
import { EnvMetadataKafka, EventsEnumType, ResourceTypeMetadataKafka, ResultMetadataKafka } from "./event.enum.ts";

export interface DataLoggerKafka {
  request: FastifyRequest;
  userId: string;
  serviceName: string;
  actionType: EventsEnumType;
  isSuccess: boolean;
}

export interface EventMetaData {
  ip_address: string,
  user_agent: string,
  resource_type: ResourceTypeMetadataKafka,
  timestamp: string,
  result: ResultMetadataKafka,
  service_name: string,
  environment: EnvMetadataKafka,
  version: string
};

export interface EventKafkaData {
  event_id: string,
  user_id: string,
  action_type: EventsEnumType,
  metadata: EventMetaData,
};