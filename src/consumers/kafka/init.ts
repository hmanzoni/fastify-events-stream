import { Kafka, type Consumer } from "kafkajs";
import { kafkaConfig } from "../../config/kafka.config.js";
import { logError, logInfo } from "../../utils/logger.util.js";

const kafka: Kafka = new Kafka({
  clientId: kafkaConfig.appName_1,
  brokers: [`${kafkaConfig.host_1}:${kafkaConfig.port_1}`],
});

// Initialize Kafka consumer
export const initConsumer = async (groupName: string) => {
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
    logError("Error initConsumer: ", err);
    throw err;
  }
};
