#!/bin/sh

set -e

HOST="$1"
shift

echo "Waiting for $HOST to be ready..."

until curl -sf "$HOST/health" > /dev/null; do
  echo "Still waiting for $HOST..."
  sleep 2
done

echo "$HOST is UP!"

exec "$@"
