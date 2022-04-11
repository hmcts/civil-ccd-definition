#!/bin/bash
set -ex

export REPORT_FILE_NAME='api-sdo'
yarn test:api-sdo

export REPORT_FILE_NAME='e2e-sdo'
yarn test:e2e-sdo
