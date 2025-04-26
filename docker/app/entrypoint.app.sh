#!/bin/sh

echo "⏳ Waiting for PostgreSQL..."
bash /wait-for-it.sh $POSTGRES_HOST:$POSTGRES_PORT --timeout=30 --strict -- echo "PostgreSQL is up!"

echo "PostgreSQL is up!"
npm run prisma-push

echo "⏳ Waiting for DynamoDB..."
bash /wait-for-it.sh $DYNAMODB_HOST:$DYNAMODB_PORT --timeout=30 --strict -- echo "DynamoDB is up!"

echo "DynamoDB is up!"
npm run create-dDb-table

npm run start