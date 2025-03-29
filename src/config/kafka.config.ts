import {config, type DotenvParseOutput} from 'dotenv';

const envVars: DotenvParseOutput | undefined = config().parsed;

export const kafkaConfig = {
  host_1: "localhost",
  port_1: envVars?.KAFKA_PORT || "9092",
  appName_1: "my-app",
  topicEvent_1: envVars?.KAFKA_TOPICS?.split(',')[0] || "events",
};