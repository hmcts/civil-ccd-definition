#!/usr/bin/env bash

set -eu

# Ensure dependencies have execution permissions
chmod +x ./bin/variables/load-dev-user-preview-environment-variables.sh
chmod +x ./bin/utils/ccd-import-definition.sh
chmod +x ./bin/utils/idam-lease-user-token.sh
chmod +x ./bin/utils/idam-lease-service-token.sh

# Load environment variables for the preview environment
source ./bin/variables/load-dev-user-preview-environment-variables.sh

# Import the local CCD definition
./bin/utils/ccd-import-definition.sh build/ccd-release-config/civil-ccd-local.xlsx
