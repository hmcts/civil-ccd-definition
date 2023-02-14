#!/bin/bash
set -ex

echo "Run Functional tests with prod ccd def file"

yarn test:master-e2e-ft
yarn test:e2e-nightly-prod
