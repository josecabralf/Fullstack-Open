#!/bin/bash
set -e

BACKEND_DIR="./backend"

# Navigate to the project directory
echo "Deploying"
cd "$BACKEND_DIR"
npm start
