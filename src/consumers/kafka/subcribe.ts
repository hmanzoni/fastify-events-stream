import type { Consumer } from "kafkajs";
import { kafkaConfig } from "../../config/kafka.config.js";
import { logError, logInfo } from "../../utils/logger.util.js";

export const subscribeTopic = async (consumer: Consumer) => {
  try {
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
