import { createClient, type ClickHouseClientConfigOptions } from "@clickhouse/client";
import { chConfig } from "../config/ch.config.js";
import type { NodeClickHouseClient } from "@clickhouse/client/dist/client.js";

const { host, port, user, pass } = chConfig;

const chConfigOptions: ClickHouseClientConfigOptions = {
  url: `http://${host}:${port}`,
  username: user,
  password: pass,
};

const clientCH: NodeClickHouseClient = createClient(chConfigOptions);

export default clientCH;
