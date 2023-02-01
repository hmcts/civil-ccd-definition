#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
  #yarn test:e2e-sdo
  #yarn test:e2e-spec
  yarn test:functional-unspec
  #yarn test:e2e-dj
else
  yarn test:e2e-spec
  yarn test:functional-unspec
fi
