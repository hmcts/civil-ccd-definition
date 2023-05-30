#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
  yarn test:api-unspec
  yarn test:api-dj
  yarn test:api-spec
else
  yarn test:master-e2e-ft
fi
