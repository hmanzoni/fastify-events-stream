import { insertEvent } from "../../services/eventsCh.service.js";
import { InsertEventData } from "../../types/index.js";
import { logError, logInfo } from "../../utils/logger.util.js";

export const insertEventHandler = async (eventChData: InsertEventData) => {
  // Save events into ClickHouse
  try {
    const resp = await insertEvent([eventChData]);
    logInfo("Event has been saved correctly in ClickHouse");
    console.log(resp);
  } catch (err) {
    logError("Error insertEventHandler: ");
    console.error(err);
    throw err;
  }
};