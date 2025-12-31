#!/bin/bash
echo "Starting frontend server..."

# Find and kill MainThread processes
PIDS=$(ps | grep MainThread | grep -v grep | awk '{print $1}')
if [ ! -z "$PIDS" ]; then
  echo "Killing MainThread processes: $PIDS"
  for pid in $PIDS; do
    kill $pid 2>/dev/null || true
  done
  sleep 2
fi

mkdir -p logs
echo "Installing dependencies..."
npm install
echo "Starting dev server..."
nohup npm run dev > logs/server.log 2>&1 
echo "Server started in background"
