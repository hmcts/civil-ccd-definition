#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
  yarn test:api-prod
  yarn test:api-nonprod
else
  yarn test:api-prod
fi
