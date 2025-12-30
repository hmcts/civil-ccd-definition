#!/usr/bin/env bash

set -eu
repoType=${1:-ccd}
prNumber=${2:-'6199'}


# Ensure dependencies have execution permissions
chmod +x ./bin/variables/load-dev-user-preview-environment-variables.sh
chmod +x ./bin/utils/ccd-import-definition.sh
chmod +x ./bin/utils/idam-lease-user-token.sh
chmod +x ./bin/utils/idam-lease-service-token.sh

if [[ "${repoType}" == 'ccd' ]]; then
  echo "Loading environment variables repoType : (${repoType}) prNumber: ${prNumber}";
  source .env.ccd.local "${prNumber}"
fi

if [[ "${repoType}" == 'cui' ]]; then
  echo "Loading environment variables (${repoType})";
  source .env.cui.local "${prNumber}"
fi

# Load environment variables for the preview environment
source ./bin/variables/load-dev-user-local-environment-variables.sh

export CCD_DEF_VERSION=""

# Generate local CCD definition
source ./bin/build-release-ccd-definition.sh local

# Import the local CCD definition
./bin/utils/ccd-import-definition.sh build/ccd-release-config/civil-ccd-local.xlsx
