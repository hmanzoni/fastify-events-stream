#!/bin/sh
set -e

echo "⏳ Waiting for PostgreSQL in $POSTGRES_HOST:$POSTGRES_PORT"
wait-for-it.sh "$POSTGRES_HOST:$POSTGRES_PORT" --timeout=30 --strict -- echo "PostgreSQL is up!"
echo "PostgreSQL is up!"

sleep 10

npm run "prisma-push"

echo "⏳ Waiting for DynamoDB in $DYNAMODB_HOST:$DYNAMODB_PORT"
wait-for-it.sh "$DYNAMODB_HOST:$DYNAMODB_PORT" --timeout=30 --strict -- echo "DynamoDB is up!"
echo "DynamoDB is up!"

sleep 10

npm run "create-dDb-table"

echo "Starting app: $@"
exec "$@"
