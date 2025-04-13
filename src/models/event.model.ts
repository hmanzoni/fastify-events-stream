import { z } from "zod";
import { uuidv7 } from "uuidv7";

export enum EventsEnumType {
  createUser = "create_user",
  getProfile = "get_user_profile",
  deleteUser = "delete_user",
  loginUser = "login_user",
  logoutUser = "logout_user",
  createEvent = "create_event",
  saveLogs = "save_logs",
  topEvents = "top_events",
  analyticsUser = "analytics_user",
  recentEvents = "recent_events",
  getEvent = "get_event",
}

export enum ResultMetadataKafka {
  success = "success",
  failure = "failure",
}
export enum ResourceTypeMetadataKafka {
  auth = "auth",
  events = "events",
  user = "user",
  analytics = "analytics",
}
export enum EnvMetadataKafka {
  dev = "dev",
  stage = "stage",
  prod = "prod",
}

const EventTypeEnum = z.nativeEnum(EventsEnumType);

const TimeStampSchema = z.date().optional().transform(() => new Date().getTime().toString());

const EventIdSchema = z.string().uuid().optional().transform(() => uuidv7());

const IdSchema = z.string().uuid("Invalid user ID");

// This schema defines the structure of an event object.
export const EventLogPgSchema = z.object({
  id: IdSchema,
  user_id: IdSchema,
  event_type: EventTypeEnum,
  timestamp: TimeStampSchema,
  metadata: z.any().optional(),
});

export const EventLogChSchema = z.object({
  event_id: IdSchema,
  event_type: EventTypeEnum,
  user_id: IdSchema,
  timestamp: TimeStampSchema,
  metadata: z.string().optional(),
});

export const EventLogDynSchema = z.object({
  event_id: IdSchema,
  user_id: IdSchema,
  timestamp: TimeStampSchema
});

export const EventMetadaKafkaSchema = z.object({
  ip_address: z.string().ip(),
  user_agent: z.string(),
  resource_type: z.nativeEnum(ResourceTypeMetadataKafka),
  timestamp: TimeStampSchema,
  result: z.nativeEnum(ResultMetadataKafka),
  service_name: z.string(),
  environment: z.nativeEnum(EnvMetadataKafka),
  version: z.string()
});

export const EventKafkaDataSchema = z.object({
  event_id: EventIdSchema,
  user_id: IdSchema,
  action_type: EventTypeEnum,
  metadata: EventMetadaKafkaSchema
});