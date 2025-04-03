import { createClient } from '@clickhouse/client';
import { chConfig } from '../config/ch.config.js';
import type { NodeClickHouseClient } from '@clickhouse/client/dist/client.js';

const clientCH: NodeClickHouseClient = createClient({
  url: `http://${chConfig.host}:${chConfig.port}`,
  username: chConfig.user,
  password: chConfig.pass
})

export default clientCH;