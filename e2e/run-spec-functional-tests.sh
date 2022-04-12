#!/bin/bash
set -ex

export REPORT_FILE_NAME='api-spec'
yarn test:api-spec

export REPORT_FILE_NAME='e2e-spec'
yarn test:e2e-spec