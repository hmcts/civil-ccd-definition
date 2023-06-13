#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
  yarn test:non-prod-e2e-ft
  echo "Running API tests on ${ENVIRONMENT} env"
  yarn test:api-all-non-prod
else
  yarn test:master-e2e-ft
  echo "Running API tests on ${ENVIRONMENT} env"
  yarn test:api-all-prod
fi
