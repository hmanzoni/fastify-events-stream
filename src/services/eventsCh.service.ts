import { type InsertParams, type QueryParams } from "@clickhouse/client";
import clientCH from "../utils/chouse.util.js";
import Stream from "stream";
import { InsertEventData } from "../types/events/events.js";

const queryDefaultCols: string = "COLUMNS('event_id'), COLUMNS('user_id'), COLUMNS('event_type'), COLUMNS('timestamp')";

export const getTopEvents = async (limit: string = "10") => {
  const queryCh: QueryParams = {
    query: `SELECT ${queryDefaultCols} FROM events LIMIT ${limit}`,
    format: "JSONEachRow",
  };
  const rows = await clientCH.query(queryCh);
  return await rows.json();
};

export const getAllUsersEvents = async () => {
  const queryCh: QueryParams = {
    query: `SELECT ${queryDefaultCols} FROM events`,
    format: "JSONEachRow",
  };
  const rows = await clientCH.query(queryCh);
  return await rows.json();
};

export const getEventById = async (id: string) => {
  const queryCh: QueryParams = {
    query: `SELECT ${queryDefaultCols} FROM events WHERE event_id = '${id}'`,
    format: "JSONEachRow",
  };
  const rows = await clientCH.query(queryCh);
  return await rows.json();
};

export const getEventByUserId = async (id: string) => {
  const queryCh: QueryParams = {
    query: `SELECT ${queryDefaultCols} FROM events WHERE user_id = '${id}'`,
    format: "JSONEachRow",
  };
  const rows = await clientCH.query(queryCh);
  return await rows.json();
};

export const insertEvent = async (event: InsertEventData[]) => {
  const queryCh: InsertParams<Stream.Readable> = {
    table: "events",
    values: event,
    format: "JSONEachRow",
  };
  await clientCH.insert(queryCh);
  return { status: "success", message: "Event inserted successfully" };
};
