#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == preview ]; then
#  todo revert after QA
  yarn test:api-hearings
#  yarn test:non-prod-e2e-ft
else
  yarn test:master-e2e-ft
fi
