#!/bin/bash
set -ex

echo "Run E2E UI Functional tests enabling all feature flags"

export REPORT_FILE_NAME='e2e-unspec'
yarn test:e2e-unspec

export REPORT_FILE_NAME='e2e-spec'
yarn test:e2e-spec

export REPORT_FILE_NAME='e2e-sdo'
yarn test:e2e-sdo