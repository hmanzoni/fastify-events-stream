import { type Producer } from "kafkajs";
import kafka from "../utils/kafka.util.js";
import { kafkaConfig } from "../config/kafka.config.js";
import { log, error } from "../utils/logger.util.js";

const producer: Producer = kafka.producer();

// TODO: Define the type of your message
type KafkaMessage = any;

const kaftaProducer = async (messages: KafkaMessage) => {
  try {
    await producer.connect();
    log("Producer connected");

    await producer.send({
      topic: kafkaConfig.topicEvent_1,
      messages: [{ value: JSON.stringify(messages) }],
    });
    log("Messages sent to Kafka topic");

    await producer.disconnect();
    log("Producer disconnected");
  } catch (err) {
    error(JSON.stringify(err));
  }
};

export default kaftaProducer;
