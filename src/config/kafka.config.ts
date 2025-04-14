import {config, type DotenvParseOutput} from 'dotenv';
import { KafkaConfig } from '../types/common/envConfig.js';

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new Error("Error loading environment variables");
}

export const kafkaConfig: KafkaConfig = {
  host_1: envVars?.KAFKA_HOST || "localhost",
  port_1: envVars?.KAFKA_PORT || "9092",
  appName_1: envVars?.KAFKA_APP || "my-app",
  topicEvent_1: envVars?.KAFKA_TOPICS || "events",
  topicGroup_1: envVars?.KAFKA_GROUPID || "events",
};