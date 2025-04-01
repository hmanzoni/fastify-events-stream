import clientCH from "../utils/chouse.ts";

export async function getTopEvents(limit: number) {
  const rows = await clientCH.query({
    query: `SELECT COLUMNS('event_id'), COLUMNS('event_type'), toTypeName(COLUMNS('user_id')) FROM events LIMIT ${limit}`,
    format: 'JSONEachRow',
  })
  return await rows.json();
}

export async function getUsersEvents() {
  const rows = await clientCH.query({
    query: "SELECT COLUMNS('event_id'), COLUMNS('event_type'), toTypeName(COLUMNS('user_id')) FROM events",
    format: 'JSONEachRow',
  })
  return await rows.json();
}

export async function getEventById(id: string) {
  const rows = await clientCH.query({
    query: `SELECT COLUMNS('event_id'), COLUMNS('event_type'), toTypeName(COLUMNS('user_id')) FROM events WHERE event_id = ${id}`,
    format: 'JSONEachRow',
  })
  return await rows.json();
}

export async function insertEvent(event: { event_type: string; user_id: string; metadata: string; }) {
  await clientCH.insert({
    table: 'events',
    // structure should match the desired format, JSONEachRow in this example
    values: event,
    format: 'JSONEachRow',
  })
  return { status: "success", message: "Event inserted successfully" };
}