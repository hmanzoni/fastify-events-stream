import { JsonValue } from "../../../generated/prisma/runtime/library.js";

export interface InsertEventData {
  event_id: string;
  event_type: string;
  user_id: string;
  metadata: string;
}

interface EventLog {
  id: string;
  event_type: string;
  user_id: string;
  timestamp: Date | null;
  metadata: JsonValue | null;
}

export type EventLogPg = EventLog[] | null;

export interface SaveLogsData {
  event_id: string;
  event_type: string;
  user_id: string;
  metadata: any;
}

export interface TopEventsQuery {
  topEvents: string | undefined;
}

export interface UserIdParams {
  id: string;
}

export interface GetEventParams {
  id: string;
}

export interface GetRecentsQuery {
  topEvents: string | undefined;
}

export interface HandleEventsBody {
  serviceName: string;
}
