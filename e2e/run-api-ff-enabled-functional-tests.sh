#!/bin/bash
set -ex

echo "Run Api Functional tests enabling all feature flags"

export REPORT_FILE_NAME='api-unspec'
yarn test:api-unspec

export REPORT_FILE_NAME='api-spec'
yarn test:api-spec

export REPORT_FILE_NAME='api-sdo'
yarn test:api-sdo
