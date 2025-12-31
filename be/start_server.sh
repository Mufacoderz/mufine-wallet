#!/bin/bash
echo "Starting FastAPI backend server..."

# Find and kill MainThread processes
PIDS=$(ps | grep uvicorn | grep -v grep | awk '{print $1}')
if [ ! -z "$PIDS" ]; then
  echo "Killing uvicorn processes: $PIDS"
  for pid in $PIDS; do
    kill $pid 2>/dev/null || true
  done
  sleep 2
fi

mkdir -p logs
echo "Installing dependencies..."
pip install -r requirements.txt
echo "Starting FastAPI server..."
nohup uvicorn main:app --host 0.0.0.0 --port 8000 --reload > logs/server.log 2>&1 
echo "Server started in background"
