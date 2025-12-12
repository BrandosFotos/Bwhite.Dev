#!/bin/bash
# Local Testing Script - Replicates GitHub Actions Workflow
# Run this script to test your website locally before pushing
# I did not write this script, I made it through ChatGPT after listing out all the steps I wanted to automate

set -e  # Exit on error

echo "========================================"
echo "Starting Local Website Tests"
echo "========================================"

# Step 1: Remove node_modules
echo ""
echo "[1/7] Removing node_modules..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
    echo "✓ node_modules removed"
else
    echo "✓ node_modules does not exist, skipping"
fi

# Step 2: Install dependencies
echo ""
echo "[2/7] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "✗ npm install failed"
    exit 1
fi
echo "✓ Dependencies installed"

# Step 3: Test dev server
echo ""
echo "[3/7] Testing dev server..."
echo "Starting dev server..."
npm run dev > /tmp/dev-server.log 2>&1 &
DEV_PID=$!

# Wait for dev server to start (max 60 seconds)
echo "Waiting for dev server to start..."
DEV_STARTED=false
for i in {1..60}; do
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        echo "✓ Dev server is running!"
        DEV_STARTED=true
        break
    fi
    sleep 1
done

if [ "$DEV_STARTED" = false ]; then
    echo "✗ Dev server failed to start within 60 seconds"
    echo "Dev server logs:"
    cat /tmp/dev-server.log || true
    kill $DEV_PID 2>/dev/null || true
    exit 1
fi

# Test that the server responds
if ! curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✗ Dev server is not responding correctly"
    echo "Dev server logs:"
    cat /tmp/dev-server.log || true
    kill $DEV_PID 2>/dev/null || true
    exit 1
fi

echo "✓ Dev server test passed!"
kill $DEV_PID 2>/dev/null || true
wait $DEV_PID 2>/dev/null || true
sleep 2

# Step 4: Build application
echo ""
echo "[4/7] Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "✗ Build failed"
    exit 1
fi
echo "✓ Build completed"

# Step 5: Test production server
echo ""
echo "[5/7] Testing production server..."
echo "Starting production server..."
npm run start > /tmp/prod-server.log 2>&1 &
START_PID=$!

# Wait for production server to start (max 60 seconds)
echo "Waiting for production server to start..."
PROD_STARTED=false
for i in {1..60}; do
    if curl -f http://localhost:3009 > /dev/null 2>&1; then
        echo "✓ Production server is running!"
        PROD_STARTED=true
        break
    fi
    sleep 1
done

if [ "$PROD_STARTED" = false ]; then
    echo "✗ Production server failed to start within 60 seconds"
    echo "Production server logs:"
    cat /tmp/prod-server.log || true
    kill $START_PID 2>/dev/null || true
    exit 1
fi

# Test that the server responds
if ! curl -f http://localhost:3009 > /dev/null 2>&1; then
    echo "✗ Production server is not responding correctly"
    echo "Production server logs:"
    cat /tmp/prod-server.log || true
    kill $START_PID 2>/dev/null || true
    exit 1
fi

echo "✓ Production server test passed!"
kill $START_PID 2>/dev/null || true
wait $START_PID 2>/dev/null || true
sleep 2

# Step 6: Build Docker images
echo ""
echo "[6/7] Building Docker images..."
docker compose build
if [ $? -ne 0 ]; then
    echo "✗ Docker build failed"
    exit 1
fi
echo "✓ Docker images built"

# Step 7: Test Docker containers
echo ""
echo "[7/7] Testing Docker containers..."
docker compose up -d
if [ $? -ne 0 ]; then
    echo "✗ Docker compose up failed"
    docker compose down
    exit 1
fi

# Wait for containers to be healthy (max 60 seconds)
echo "Waiting for Docker containers to start..."
DOCKER_STARTED=false
for i in {1..60}; do
    if docker compose ps | grep -q "Up"; then
        if curl -f http://localhost:3009 > /dev/null 2>&1; then
            echo "✓ Docker containers are running and responding!"
            DOCKER_STARTED=true
            break
        fi
    fi
    sleep 1
done

if [ "$DOCKER_STARTED" = false ]; then
    echo "✗ Docker containers failed to start within 60 seconds"
    echo "Docker logs:"
    docker compose logs
    docker compose down
    exit 1
fi

# Test that the service responds
if ! curl -f http://localhost:3009 > /dev/null 2>&1; then
    echo "✗ Docker service is not responding correctly"
    echo "Docker logs:"
    docker compose logs
    docker compose down
    exit 1
fi

echo "✓ Docker test passed!"

# Show Docker logs
echo ""
echo "Docker logs:"
docker compose logs

# Cleanup
echo ""
echo "Cleaning up Docker containers..."
docker compose down -v
echo "✓ Cleanup completed"

echo ""
echo "========================================"
echo "All tests passed! ✓"
echo "========================================"

