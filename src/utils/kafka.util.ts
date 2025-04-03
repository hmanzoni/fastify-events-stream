import { Kafka } from "kafkajs";
import { kafkaConfig } from "../config/kafka.config.js";

const kafka: Kafka = new Kafka({
  clientId: kafkaConfig.appName_1,
  brokers: [`${kafkaConfig.host_1}:${kafkaConfig.port_1}`],
});

export default kafka;
