#!/usr/bin/env bash

echo "Creating CCD definitions in build/ccd-release-config folder"

set -e
eval $(./bin/variables/load-prod-environment-variables.sh)
./bin/build-release-ccd-definition.sh prod true
