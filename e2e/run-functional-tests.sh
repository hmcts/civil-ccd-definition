#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
#  todo revert this
  yarn test:api-noc-unspec
else
  yarn test:master-e2e-ft
fi
