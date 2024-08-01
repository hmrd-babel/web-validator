#!/bin/bash

# Navigate to the project directory
cd /home/ubuntu/web-validator

# Pull the latest changes from the repository
## git pull origin main
# Pull changes from repo squashing any changes in here
git fetch origin
git reset --hard origin/main

# Install any new dependencies
npm install cypress

# Restart the Node.js application with PM2
pm2 restart ecosystem.config.js --env production