import { createClient } from '@clickhouse/client';
import { chConfig } from '../config/ch.config.ts';
import type { NodeClickHouseClient } from '@clickhouse/client/dist/client.js';

const clientCH: NodeClickHouseClient = createClient({
  host: `${chConfig.host}:${chConfig.user}`,
  username: chConfig.user,
  password: chConfig.pass,
})

export default clientCH;