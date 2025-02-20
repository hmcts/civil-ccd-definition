#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

export CCD_UI_TESTS=true
if [ ${ENVIRONMENT} == preview ]; then
  yarn test:master-e2e-ft
else
  yarn test:non-prod-e2e-ft
fi
