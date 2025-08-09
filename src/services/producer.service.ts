import { type Producer, Partitioners } from "kafkajs";
import kafka from "../utils/kafka.util.js";
import { kafkaConfig } from "../config/kafka.config.js";
import { logInfo, logError } from "../utils/logger.util.js";
import { EventKafkaData } from "../types/events/kafka.js";

const producer: Producer = kafka.producer({createPartitioner: Partitioners.DefaultPartitioner });

export const connectProducer = async () => {
  try {
    await producer.connect();
    logInfo("Kafka Producer connected successfully");
  } catch (err) {
    logError("Error connecting Kafka Producer: ", err);
    throw err;
  }
};

export const disconnectProducer = async () => {
  try {
    await producer.disconnect();
    logInfo("Kafka Producer disconnected successfully");
  } catch (err) {
    logError("Error disconnecting Kafka Producer: ", err);
  }
};

const kaftaProducer = async (messages: EventKafkaData) => {
  try {
    await producer.send({
      topic: kafkaConfig.topicEvent_1,
      messages: [{ value: JSON.stringify(messages) }],
    });
    logInfo("Messages sent to Kafka topic");
  } catch (err) {
    logError("Error kaftaProducer: ", err);
  }
};

export default kaftaProducer;
