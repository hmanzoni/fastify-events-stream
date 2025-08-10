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

echo "⏳ Waiting for DynamoDB in $DYNAMODB_HOST:$DYNAMODB_PORT"
wait-for-it.sh "$DYNAMODB_HOST:$DYNAMODB_PORT" --timeout=30 --strict -- echo "DynamoDB is up!"

echo "🚀 Creating DynamoDB table..."
until npm run "create-dDb-table"; do
    echo "create-dDb-table failed, retrying in 5 seconds..."
    sleep 5
done
echo "✅ DynamoDB table created."

echo "Starting app: $@"
exec "$@"
