import { z } from "zod";
import { uuidv7 } from "uuidv7";
import { EnvMetadataKafka, EventsEnumType, ResourceTypeMetadataKafka, ResultMetadataKafka } from "../types/events/event.enum.js";

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