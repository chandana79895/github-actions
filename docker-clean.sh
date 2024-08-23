#!/bin/bash

# Define the container ID or name
CONTAINER_ID="ec4f9e097f9f"

# Define the directory to clean
DIRECTORY="/home/runner/actions-runner/_work/*"

# Execute the command to remove the files and folders in the specified directory
sudo docker exec $CONTAINER_ID rm -rf $DIRECTORY

# Print a confirmation message
echo "Cleaned the directory $DIRECTORY in container $CONTAINER_ID"