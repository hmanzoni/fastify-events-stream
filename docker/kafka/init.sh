#!/bin/bash

# Extract the Kafka server address from the KAFKA_ADVERTISED_LISTENERS variable
KAFKA_SERVER=$(echo "$KAFKA_ADVERTISED_LISTENERS" | sed -E 's/.*PLAINTEXT:\/\///' | cut -d ',' -f1)
echo "Kafka Server: $KAFKA_SERVER"

echo -e 'Creating kafka topics'
# Loop in topics
IFS=',' read -ra TOPICS <<< "$KAFKA_TOPICS"
for topic in "${TOPICS[@]}"; do
    echo "Kafka Topic: $topic"
    kafka-topics --bootstrap-server $KAFKA_SERVER --create --if-not-exists --topic $topic --replication-factor 1 --partitions 1
done

echo -e 'Successfully created the following topics:'
kafka-topics --bootstrap-server kafka:29092 --list