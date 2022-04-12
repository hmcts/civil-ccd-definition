#!/bin/bash
set -ex

export REPORT_FILE_NAME='api-unspec'
yarn test:api-unspec

export REPORT_FILE_NAME='e2e-unspec'
yarn test:e2e-unspec
