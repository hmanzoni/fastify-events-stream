import { saveLogs } from "../../services/logs.service.js";
import { SaveLogsData } from "../../types/index.js";
import { logError, logInfo } from "../../utils/logger.util.js";

export const saveLogsHandler = async (eventValue: SaveLogsData) => {
  try {
    const resp = await saveLogs(eventValue);
    logInfo("Log saved successfully");
    console.log(resp);
  } catch (err) {
    logError("Error saveLogsHandler: ");
    console.error(err);
    throw err;
  }
};