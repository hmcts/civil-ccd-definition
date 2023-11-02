#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
  yarn test:e2e-1v1
else
  yarn test:e2e-1v1
fi
