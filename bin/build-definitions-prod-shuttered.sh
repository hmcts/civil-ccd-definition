#!/usr/bin/env bash

echo "Creating CCD definitions in build/ccd-release-config folder"

set -e
./bin/refuse-once-civil-service-owns-definitions.sh build-definitions-prod-shuttered.sh
eval $(./bin/variables/load-prod-environment-variables.sh)
./bin/build-release-ccd-definition.sh prod true
