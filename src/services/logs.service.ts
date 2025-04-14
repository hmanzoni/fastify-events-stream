import { EventLogPg, SaveLogsData } from "../types/events/events.js";
import prisma from "../utils/prisma.util.js";

export const fetchLogs = async () => {
  const logs: EventLogPg = await prisma.event_logs.findMany({
    orderBy: { timestamp: "desc" }
  });
  return logs;
}


export const saveLogs = async (data: SaveLogsData) => {
  const { event_id, event_type, user_id, metadata } = data;
  return await prisma.event_logs.create({
    data: {
      id: event_id,
      event_type,
      user_id,
      metadata,
    },
  });
}