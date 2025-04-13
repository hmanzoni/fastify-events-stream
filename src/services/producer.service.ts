import { type Producer } from "kafkajs";
import kafka from "../utils/kafka.util.js";
import { kafkaConfig } from "../config/kafka.config.js";
import { logInfo, logError } from "../utils/logger.util.js";
import { EnvMetadataKafka, EventsEnumType, ResourceTypeMetadataKafka, ResultMetadataKafka } from "../models/event.model.js";

const producer: Producer = kafka.producer();

type EventMetaData = {
  ip_address: string,
  user_agent: string,
  resource_type: ResourceTypeMetadataKafka,
  timestamp: string,
  result: ResultMetadataKafka,
  service_name: string,
  environment: EnvMetadataKafka,
  version: string
};

export type EventKafkaData = {
  event_id: string,
  user_id: string,
  action_type: EventsEnumType,
  metadata: EventMetaData,
};

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
