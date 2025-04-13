import { z } from "zod";
import { uuidv7 } from "uuidv7";

export enum Events {
  createUser = "create_user",
  saveLogs = "save_logs",
  createEvent = "create_event",
  deleteUser = "delete_user"
}

const EventTypeEnum = z.nativeEnum(Events);

const TimeStampSchema = z.date().optional().transform(() => new Date().getTime().toString());

const IdSchema = z.string().uuid().optional().transform(() => uuidv7());

const UserIdSchema = z.string().uuid("Invalid user ID");

// This schema defines the structure of an event object.
export const EventLogPgSchema = z.object({
  id: IdSchema,
  user_id: UserIdSchema,
  event_type: EventTypeEnum,
  timestamp: TimeStampSchema,
  metadata: z.any().optional(),
});

export const EventLogChSchema = z.object({
  event_id: IdSchema,
  event_type: EventTypeEnum,
  user_id: UserIdSchema,
  timestamp: TimeStampSchema,
  metadata: z.string().optional(),
});

export const EventLogDynSchema = z.object({
  event_id: IdSchema,
  user_id: UserIdSchema,
  timestamp: TimeStampSchema
});