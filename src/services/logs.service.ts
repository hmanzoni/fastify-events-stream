import { type JsonValue } from "../../generated/prisma/runtime/library.js";
import prisma from "../utils/prisma.util.js";

type EventLogPg = {
  id: string;
  event_type: string;
  user_id: string;
  timestamp: Date | null;
  metadata: JsonValue | null;
}[] | null;

export const fetchLogs = async () => {
  const logs: EventLogPg = await prisma.event_logs.findMany({
    orderBy: { timestamp: "desc" }
  });
  return logs;
}

export type SaveLogsData = {
  event_id: string;
  event_type: string;
  user_id: string;
  metadata: any;
};

export const saveLogs = async (data: SaveLogsData) => {
  const { event_type, user_id, metadata } = data;
  return await prisma.event_logs.create({
    data: {
      event_type,
      user_id,
      metadata,
    },
  });
}