#!/bin/bash
set -e

clickhouse client -n <<-EOSQL
    CREATE DATABASE EventStream IF NOT EXISTS;
    CREATE TABLE events (
        event_id UUID DEFAULT generateUUIDv4(),
        event_type String,
        user_id String,
        timestamp DateTime DEFAULT now(),
        metadata String
    ) ENGINE = MergeTree()
    ORDER BY (event_type, timestamp);
EOSQL
