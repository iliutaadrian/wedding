#!/bin/bash
# Replace these with your actual values
USERNAME="iliutaadrian"
APP_NAME="wedding-website"
HOMELAB_HOST="homelab"
REMOTE_PATH="/Sites/wedding"

# Build image locally for linux/amd64 (common for homelab servers)
echo "Building image locally..."
docker build --platform linux/amd64 \
  -t ${USERNAME}/${APP_NAME}:latest .

# Save image to a tar file
echo "Saving image to tar file..."
docker save -o ${APP_NAME}.tar ${USERNAME}/${APP_NAME}:latest

# Transfer image and docker-compose to homelab
echo "Transferring files to homelab..."
scp ${APP_NAME}.tar ${HOMELAB_HOST}:/tmp/
ssh ${HOMELAB_HOST} "mkdir -p ${REMOTE_PATH}"

# Fix: If suggestions.json exists as a directory (due to docker volume mount error), remove it
ssh ${HOMELAB_HOST} "if [ -d ${REMOTE_PATH}/suggestions.json ]; then rm -rf ${REMOTE_PATH}/suggestions.json; fi"

# Copy essential config files
scp docker-compose.yml ${HOMELAB_HOST}:${REMOTE_PATH}/
scp .env.local ${HOMELAB_HOST}:${REMOTE_PATH}/.env.local

# Check if suggestions.json exists remotely; if not, copy it. If yes, leave it alone.
ssh ${HOMELAB_HOST} "if [ ! -f ${REMOTE_PATH}/suggestions.json ]; then exit 1; fi"
if [ $? -eq 1 ]; then
    echo "suggestions.json not found remotely. Copying local version..."
    scp suggestions.json ${HOMELAB_HOST}:${REMOTE_PATH}/
else
    echo "suggestions.json already exists remotely. Skipping copy to preserve data."
fi

# Load image on homelab and run deployment
echo "Deploying to homelab..."
ssh ${HOMELAB_HOST} << EOF
  # Load the image
  docker load -i /tmp/${APP_NAME}.tar

  # Remove the tar file
  rm /tmp/${APP_NAME}.tar

  cd ${REMOTE_PATH}
  docker compose up -d
EOF

# Remove local tar file
echo "Cleaning up local tar file..."
rm ${APP_NAME}.tar

echo "Deployment completed!"