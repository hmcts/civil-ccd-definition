#!/bin/bash
set -ex

echo "Run Api Functional tests for api-unspec"
yarn test:api-unspec
yarn test:api-spec

echo "Run E2E Functional tests with prod ccd def file"

yarn test:master-e2e-ft
yarn test:e2e-nightly-prod


