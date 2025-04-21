#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

export CCD_UI_TESTS=false
if [ ${ENVIRONMENT} == preview ]; then
#  yarn test:non-prod-e2e-ft
  yarn test:api-QM
else
  yarn test:master-e2e-ft
fi
