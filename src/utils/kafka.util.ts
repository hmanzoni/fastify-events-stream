import { Kafka, type KafkaConfig } from "kafkajs";
import { kafkaConfig } from "../config/kafka.config.js";

const config: KafkaConfig = {
  clientId: kafkaConfig.appName_1,
  brokers: [`${kafkaConfig.host_1}:${kafkaConfig.port_1}`],
};

const kafka: Kafka = new Kafka(config);

export default kafka;
