cd ..
cd backend
node main.js & echo "backend is running"
BACKEND_PID=$!
echo "Backend is running with PID: $BACKEND_PID"
wait $BACKEND_PID