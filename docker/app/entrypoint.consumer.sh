#!/bin/sh
set -e

echo "⏳ Waiting for PostgreSQL in $POSTGRES_HOST:$POSTGRES_PORT"
wait-for-it.sh "$POSTGRES_HOST:$POSTGRES_PORT" --timeout=30 --strict -- echo "PostgreSQL is up!"

echo "🚀 Pushing schema to PostgreSQL..."
until npm run "prisma-push"; do
  echo "prisma-push failed, retrying in 5 seconds..."
  sleep 5
done
echo "✅ Schema pushed successfully."

echo "⏳ Waiting for Kafka in $KAFKA_HOST:$KAFKA_PORT"
wait-for-it.sh "$KAFKA_HOST:$KAFKA_PORT" --timeout=30 --strict -- echo "Kafka is up!"

echo "Starting app: $@"
exec "$@"
