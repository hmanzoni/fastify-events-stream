import { KafkaMessage } from "kafkajs";
import { EventKafkaData } from "../../types/index.js";
import { saveLogsHandler } from "../handlers/log.actions.js";
import { saveEventTypeHandler } from "../handlers/eventDyn.action.js";
import { insertEventHandler } from "../handlers/eventCh.action.js";

export const messageHandler = async (message: KafkaMessage) => {
  if (!message.value) return "error: message.value is undefined";

  const eventValue: EventKafkaData = JSON.parse(message.value.toString());

  const { action_type, user_id, metadata, event_id } = eventValue;
  await saveLogsHandler({
    event_id,
    event_type: action_type,
    user_id,
    metadata,
  });
  await saveEventTypeHandler(event_id, user_id);

  // Save events into ClickHouse
  await insertEventHandler({
    event_id,
    event_type: action_type,
    user_id,
    metadata: JSON.stringify(eventValue.metadata),
  });
};