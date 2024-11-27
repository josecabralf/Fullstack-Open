#!/bin/bash
set -e

BACKEND_DIR="./backend"
FRONTEND_DIR="./frontend"

# Navigate to the project directory
cd "$BACKEND_DIR"

npm install

# Build frontend
cd ..
cd "$FRONTEND_DIR"
npm run build

# Move the build output to the specified directory
cd ..
mv $FRONTEND_DIR/dist "$BACKEND_DIR"

echo "Build completed successfully and moved to $BUILD_OUTPUT_DIR"