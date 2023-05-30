#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
  yarn --silent test:api-unspec
  yarn --silent test:api-dj
  yarn --silent test:api-spec
else
  yarn test:master-e2e-ft
fi
