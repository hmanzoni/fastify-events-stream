#!/bin/bash

echo "⏳ Waiting for PostgreSQL..."
bash /wait-for-it.sh $POSTGRES_HOST:$POSTGRES_PORT --timeout=30 --strict -- echo "PostgreSQL is up!"

echo "PostgreSQL is up!"
npm run prisma-push

echo "⏳ Waiting for Kafka..."
bash /wait-for-it.sh $KAFKA_HOST:$KAFKA_PORT --timeout=30 --strict -- echo "Kafka is up!"

echo "Kafka is up!"

npm run consumer-up