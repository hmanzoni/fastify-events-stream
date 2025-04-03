import prisma from "../utils/prisma.util.ts";

export async function fetchLogs() {
  const logs = await prisma.event_logs.findMany({
    orderBy: { timestamp: "desc" }
  });
  return logs;
}

export async function saveLogs(data: { event_type: string; user_id: string; metadata: any }) {
  const { event_type, user_id, metadata } = data;
  return await prisma.event_logs.create({
    data: {
      event_type,
      user_id,
      metadata,
    },
  });
}