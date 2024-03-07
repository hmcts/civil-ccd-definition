#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

export CCD_UI_TESTS=false
if [ ${ENVIRONMENT} == preview ]; then
  yarn test:api-nonprod
  yarn test:api-prod
else
  yarn test:api-prod
fi
