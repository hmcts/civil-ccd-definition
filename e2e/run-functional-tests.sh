#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
  yarn test:non-prod-e2e-ft
  echo "Running Functional tests on preview env"
  yarn test:api-all
else
  yarn test:master-e2e-ft
fi
