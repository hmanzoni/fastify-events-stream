import clientCH from "../utils/chouse.ts";

export async function getTopEvents(limit: string = '10') {
  const rows = await clientCH.query({
    query: `SELECT COLUMNS('event_id'), COLUMNS('user_id'), COLUMNS('event_type'), COLUMNS('timestamp') FROM events LIMIT ${limit}`,
    format: 'JSONEachRow',
  })
  return await rows.json();
}

export async function getAllUsersEvents() {
  const rows = await clientCH.query({
    query: "SELECT COLUMNS('event_id'), COLUMNS('user_id'), COLUMNS('event_type'), COLUMNS('timestamp') FROM events",
    format: 'JSONEachRow',
  })
  return await rows.json();
}

export async function getEventById(id: string) {
  const rows = await clientCH.query({
    query: `SELECT COLUMNS('event_id'), COLUMNS('user_id'), COLUMNS('event_type'), COLUMNS('timestamp') FROM events WHERE event_id = '${id}'`,
    format: 'JSONEachRow',
  })
  return await rows.json();
}

export async function getEventByUserId(id: string) {
  const rows = await clientCH.query({
    query: `SELECT COLUMNS('event_id'), COLUMNS('user_id'), COLUMNS('event_type'), COLUMNS('timestamp') FROM events WHERE user_id = '${id}'`,
    format: 'JSONEachRow',
  })
  return await rows.json();
}

export async function insertEvent(event: { event_type: string; user_id: string; metadata: string; }[]) {
  await clientCH.insert({
    table: 'events',
    values: event,
    format: 'JSONEachRow',
  });
  return { status: "success", message: "Event inserted successfully" };
}