import { Kafka, type Producer } from "kafkajs";
import { kafkaConfig } from "../config/kafka.config.ts";

const kafka: Kafka = new Kafka({
  clientId: kafkaConfig.appName_1,
  brokers: [`${kafkaConfig.host_1}:${kafkaConfig.port_1}`],
});

// Create a producer instance
const producer: Producer = kafka.producer();

const kaftaProducer = async (messages: any) => {
  console.log(messages);

  try {
    // Connect the producer to the Kafka broker
    await producer.connect();
    console.log("Producer connected - 🔗");

    // Send messages to the topic
    await producer.send({
      topic: kafkaConfig.topicEvent_1,
      messages: [{ value: JSON.stringify(messages) }],
    });

    console.log("Messages sent - 📤");

    await producer.disconnect();
    console.log("Producer disconnected - 🛑");
  } catch (err) {
    console.error("Error in producer:", err);
  }
};

export default kaftaProducer;
