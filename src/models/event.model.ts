import { z } from "zod";
import { uuidv7 } from "uuidv7";

// This schema defines the structure of an event object.
export const EventLogPgSchema = z.object({
  id: z.string().uuid().optional().transform(() => uuidv7()),
  user_id: z.string(),
  event_type: z.string(),
  metadata: z.any().optional(),
  timestamp: z.date().optional().transform(() => new Date().getTime().toString()),
});

export const EventLogChSchema = z.object({
  event_id: z.string().uuid().optional().transform(() => uuidv7()),
  event_type: z.string(),
  user_id: z.string(),
  timestamp: z.date().optional().transform(() => new Date().getTime().toString()),
  metadata: z.string().optional(),
});

export const EventLogDynSchema = z.object({
  event_id: z.string().uuid().optional().transform(() => uuidv7()),
  user_id: z.string(),
  timestamp: z.date().optional().transform(() => new Date().getTime().toString())
});