#!/bin/bash
# Fetch env variables and create the .env file
cat <<EOL > .env
VITE_API_BASE_URL=http://3.92.185.115/backend/api

EOL
# Ensure SSH key scanning and connection
echo "Setting up SSH..."
ssh-keyscan -H $SERVER_IP >> ~/.ssh/known_hosts
# # Remove old files on the server
# echo "Removing old files on the server..."
# ssh $USER@$SERVER_IP 'rm -rf /var/www/html/dow/dev/dow_react/*'
# # Copy built files to the remote server
# echo "Copying built files to the server..."
# scp -r dist * $USER@$SERVER_IP:/var/www/html/dow/dev/dow_react/
# scp -r .env $USER@$SERVER_IP:/var/www/html/dow/dev/dow_react/

# Build the project
echo "Building the project..."
npm run build  # Change this if using yarn or another build command

# Remove old files on the server
echo "Removing old files on the server..."
ssh $USER@$SERVER_IP 'rm -rf /var/www/html/dow/dev/dow_react/*'

# Copy only the dist folder to the remote server
echo "Copying built files to the server..."
scp -r dist $USER@$SERVER_IP:/var/www/html/dow/dev/dow_react/

# Copy environment file if needed
scp .env $USER@$SERVER_IP:/var/www/html/dow/dev/dow_react/
