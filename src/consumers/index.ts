import type { EachMessagePayload } from "kafkajs";
import { initConsumer } from "./kafka/init.js";
import { subscribeTopic } from "./kafka/subcribe.js";
import { CommitData } from "../types/common/consumer.js";
import { messageHandler } from "./actions/consumer.action.js";
import { commitTopic } from "./kafka/commit.js";
import { logError } from "../utils/logger.util.js";
import { kafkaConfig } from "../config/kafka.config.js";

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
        const commitData: CommitData = {
          topic,
          partition,
          offset: message.offset
        }
        await messageHandler(message);
        await commitTopic(consumer, commitData);
      },
    });
  } catch (err) {
    logError("Error trying to run the consumer ", err);
    throw err;
  }
};

// Start the consumer
kafkaConsumer(kafkaConfig.topicGroup_1);

