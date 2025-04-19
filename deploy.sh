#!/bin/bash

# Exit on error
set -e

# Pull latest changes
echo "Pulling latest changes from repository..."
git pull

# Install dependencies
echo "Installing dependencies..."
npm install

# Build all packages
echo "Building all packages..."
npm run build:all

# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null
then
    echo "Installing PM2..."
    npm install -g pm2
fi

# Start or restart the application with PM2
echo "Starting application with PM2..."
pm2 restart ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production

# Make sure Nginx is installed and configured
if command -v nginx &> /dev/null
then
    echo "Checking Nginx configuration..."
    sudo cp nginx.conf /etc/nginx/sites-available/motionmagic.space.conf
    
    # Create symbolic link if it doesn't exist
    if [ ! -f /etc/nginx/sites-enabled/motionmagic.space.conf ]; then
        sudo ln -s /etc/nginx/sites-available/motionmagic.space.conf /etc/nginx/sites-enabled/
    fi
    
    # Test and reload Nginx
    echo "Testing Nginx configuration..."
    sudo nginx -t
    
    echo "Reloading Nginx..."
    sudo systemctl reload nginx
else
    echo "Nginx not found. Please install Nginx and configure it manually."
fi

echo "Deployment completed successfully!" 