#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
  #yarn test:non-prod-e2e-ft
  echo 'Not running test until hearing remaster is merged'
else
  yarn test:master-e2e-ft
fi
