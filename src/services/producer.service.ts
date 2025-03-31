import { type Producer } from "kafkajs";
import kafka from "../utils/kafka.ts";
import { kafkaConfig } from "../config/kafka.config.ts";
import { log } from "../utils/logger.ts";

// Create a producer instance
const producer: Producer = kafka.producer();

const kaftaProducer = async (messages: any) => {
  try {
    // Connect the producer to the Kafka broker
    await producer.connect();
    log("Producer connected - 🔗");

    // Send messages to the topic
    await producer.send({
      topic: kafkaConfig.topicEvent_1,
      messages: [{ value: JSON.stringify(messages) }],
    });

    log("Messages sent - 📤");

    await producer.disconnect();
    log("Producer disconnected - 🛑");
  } catch (err) {
    console.error("Error in producer:", err);
  }
};

export default kaftaProducer;
