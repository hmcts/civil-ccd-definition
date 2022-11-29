#!/bin/bash
set -ex

echo "Run Functional tests"

echo ${ENVIRONMENT}

if [ ${ENVIRONMENT} == preview ]; then
  yarn test:e2e-sdo
  yarn test:e2e-spec
  yarn test:functional-unspec
  yarn test:e2e:dj
else
  yarn test:e2e-spec
  yarn test:functional-unspec
fi
