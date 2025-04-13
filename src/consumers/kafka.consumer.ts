import {
  Kafka,
  type EachMessagePayload,
  type KafkaMessage,
  type Consumer,
} from "kafkajs";
import { kafkaConfig } from "../config/kafka.config.js";
import { registerUser, RegisterUserData } from "../services/users.service.js";
import { saveLogs, SaveLogsData } from "../services/logs.service.js";
import { createEvent } from "../services/eventsDyn.service.js";
import { insertEvent, InsertEventData } from "../services/eventsCh.service.js";
import { logInfo, logError } from "../utils/logger.util.js";

const kafka: Kafka = new Kafka({
  clientId: kafkaConfig.appName_1,
  brokers: [`${kafkaConfig.host_1}:${kafkaConfig.port_1}`],
});

const initConsumer = async (groupName: string) => {
  // Create instance of Kafka consumer
  const consumer: Consumer = kafka.consumer({
    groupId: groupName,
  });
  try {
    // Connect the consumer to the Kafka broker
    await consumer.connect();
    logInfo("Consumer connected successfully");
    return consumer;
  } catch (err) {
    logError("Error initConsumer: ");
    console.error(err);
    throw err;
  }
};

const subscribeTopic = async (consumer: Consumer) => {
  try {
    // Subscribe to the topic
    await consumer.subscribe({
      topic: kafkaConfig.topicEvent_1,
      fromBeginning: true,
    });
    logInfo("Topic subscribed successfully");
  } catch (err) {
    logError("Error subscribeTopic: ");
    console.error(err);
    throw err;
  }
};

const createUserHandler = async (eventValueRegUser: RegisterUserData) => {
  try {
    const resp = await registerUser(eventValueRegUser);
    logInfo("User register successfully");
    console.log(resp);
  } catch (err: any) {
    if (err.message.includes("User already exists")) {
      console.warn("User already exists, continuing...");
    } else {
      logError("Error createUserHandler: ");
      console.error(err);
      throw err;
    }
  }
};

const saveLogsHandler = async (eventValue: SaveLogsData) => {
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

const saveEventType = async (eventId: string, userId: string) => {
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

const insertEventHandler = async (eventChData: InsertEventData) => {
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

const kafkaConsumerHandler = async (message: KafkaMessage) => {
  if (!message.value) return "error: message.value is undefined";

  const eventValue = JSON.parse(message.value.toString());
  const actionType = eventValue?.action_type;

  // Process action: create_user
  if (actionType === "create_user") {
    const { id, username, password_hash, email } = eventValue;
    await createUserHandler({ id, username, password_hash, email });
  }

  // Process action: save_logs
  if (actionType === "save_logs") {
    const { event_type, user_id, metadata, event_id } = eventValue;
    await saveLogsHandler({
      event_id,
      event_type,
      user_id,
      metadata,
    });
    await saveEventType(event_id, user_id);
  }

  // Save events into ClickHouse
  await insertEventHandler({
    event_id: eventValue.event_id,
    event_type: actionType,
    user_id: eventValue.user_id,
    metadata: JSON.stringify(eventValue),
  });
};

const kafkaConsumer = async (groupName: string = "default") => {
  // Create instance of Kafka consumer and SUbscribe to the topic
  const consumer = await initConsumer(groupName);
  await subscribeTopic(consumer);

  try {
    // Listening the consumer and read messages from the topic
    await consumer.run({
      autoCommit: false,
      eachMessage: async (dataMsg: EachMessagePayload) => {
        const { topic, partition, message } = dataMsg;
        const offset: string = (Number(message.offset) + 1).toString();
        await kafkaConsumerHandler(message);
        await consumer.commitOffsets([{ topic, partition, offset }]);
      },
    });
  } catch (err) {
    logError("Error trying to run the consumer");
    console.error(err);
    throw err;
  }
};

// Start the consumer
kafkaConsumer("test_group");
