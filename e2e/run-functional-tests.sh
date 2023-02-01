#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
  yarn test:functional-unspec
else
  yarn test:e2e-spec
  yarn test:functional-unspec
fi
