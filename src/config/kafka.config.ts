import {config, type DotenvParseOutput} from 'dotenv';

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new Error("Error loading environment variables");
}

type KafkaConfig = {
  host_1: string;
  port_1: string;
  appName_1: string;
  topicEvent_1: string;
};

export const kafkaConfig: KafkaConfig = {
  host_1: envVars?.KAFKA_HOST || "localhost",
  port_1: envVars?.KAFKA_PORT || "9092",
  appName_1: envVars?.KAFKA_APP || "my-app",
  topicEvent_1: envVars?.KAFKA_TOPICS?.split(',')[0] || "events",
};