import { type Producer } from "kafkajs";
import kafka from "../utils/kafka.util.js";
import { kafkaConfig } from "../config/kafka.config.js";
import { logInfo, logError } from "../utils/logger.util.js";
import { EventKafkaData } from "../types/events/kafka.js";

const producer: Producer = kafka.producer();

const kaftaProducer = async (messages: EventKafkaData) => {
  try {
    await producer.connect();
    logInfo("Producer connected");

    await producer.send({
      topic: kafkaConfig.topicEvent_1,
      messages: [{ value: JSON.stringify(messages) }],
    });
    logInfo("Messages sent to Kafka topic");

    await producer.disconnect();
    logInfo("Producer disconnected");
  } catch (err) {
    logError(JSON.stringify(err));
  }
};

export default kaftaProducer;
