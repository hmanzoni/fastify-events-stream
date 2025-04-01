#!/bin/bash
set -e

clickhouse client -n <<-EOSQL
    CREATE TABLE events (
        event_id UUID DEFAULT generateUUIDv4(),
        event_type String,
        user_id String,
        timestamp DateTime DEFAULT now(),
        metadata String
    ) ENGINE = MergeTree()
    PRIMARY KEY (event_type)
    ORDER BY (event_type, timestamp);
EOSQL