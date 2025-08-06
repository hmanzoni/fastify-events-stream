import { type SignOptions } from "jsonwebtoken";

export interface ClickHouseConfig {
  host: string;
  pass: string;
  user: string;
  port: string;
}

export interface DynConfig {
  region: string;
  protocol: string;
  port: string;
  host: string;
  tableName: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface JwtConfig {
  jwtLoginSecret: string;
  jwtRefreshSecret: string;
  configRefreshOptions: SignOptions;
  configLoginOptions: SignOptions;
}

export interface KafkaConfig {
  host_1: string;
  port_1: string;
  appName_1: string;
  topicEvent_1: string;
  topicGroup_1: string;
}

export interface PgConfig {
  pass: string;
  user: string;
  name: string;
  port: string;
}
