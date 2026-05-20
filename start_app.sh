#!/bin/bash

# Kill any existing processes on ports 5113 (Backend) and 5173 (Frontend)
echo "Stopping any existing services on ports 5113 and 5173..."
lsof -ti:5113 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null

# Get the local IP address
IP=$(ipconfig getifaddr en0)
echo "=================================================="
echo "   🌌   C O S M I C   A S T R O L O G Y   🌌"
echo "=================================================="
echo "Local IP Address: $IP"
echo ""

# Start Backend
echo "[1/2] Starting Astrology Backend Server..."
cd "$(dirname "$0")/backend"
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend running (PID: $BACKEND_PID). Logs: backend.log"

# Wait for Backend to bootstrap
sleep 2

# Start Frontend
echo "[2/2] Starting Astrology Frontend Dashboard..."
cd "../frontend"
npm run dev -- --host > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend running (PID: $FRONTEND_PID). Logs: frontend.log"

echo ""
echo "=================================================="
echo "   🌌  A S T R O L O G Y   A P P L I C A T I O N  🌌"
echo "=================================================="
echo "Access on this Mac: http://localhost:5173"
if [ ! -z "$IP" ]; then
  echo "Access on Network:  http://$IP:5173"
fi
echo "Backend API:        http://localhost:5113"
echo ""
echo "Press CTRL+C to stop all servers."
echo "=================================================="

# Wait for user to exit and kill background processes on Ctrl+C
trap "echo -e '\nStopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT SIGTERM
wait
