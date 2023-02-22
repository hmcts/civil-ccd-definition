#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
#  todo revert this
#  yarn test:api-noc-unspec
#  yarn test:api-noc-spec
  yarn test:e2e-noc
else
  yarn test:master-e2e-ft
fi
