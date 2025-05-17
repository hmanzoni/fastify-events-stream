#!/bin/sh
set -e

echo "⏳ Waiting for PostgreSQL in $POSTGRES_HOST:$POSTGRES_PORT"
wait-for-it.sh "$POSTGRES_HOST:$POSTGRES_PORT" --timeout=30 --strict -- echo "PostgreSQL is up!"
echo "PostgreSQL is up!"

sleep 10

npm run "prisma-push"

echo "⏳ Waiting for Kafka in $KAFKA_HOST:$KAFKA_PORT"
wait-for-it.sh "$KAFKA_HOST:$KAFKA_PORT" --timeout=30 --strict -- echo "Kafka is up!"
echo "Kafka is up!"

sleep 10

echo "Starting app: $@"
exec "$@"
