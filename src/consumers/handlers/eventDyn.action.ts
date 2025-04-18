import { createEvent } from "../../services/eventsDyn.service.js";
import { logError, logInfo } from "../../utils/logger.util.js";

export const saveEventTypeHandler = async (eventId: string, userId: string) => {
  try {
    const resp = await createEvent(eventId, userId);
    logInfo("Event has been saved correctly in DynamoDB");
    console.log(resp);
  } catch (err) {
    logError("Error saveEventType: ");
    console.error(err);
    throw err;
  }
};