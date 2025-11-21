#!/usr/bin/env bash

set -eu

echo 'export ENVIRONMENT=perftest'
echo "export CCD_DEF_CASE_SERVICE_BASE_URL=http://civil-service-perftest.service.core-compute-perftest.internal"
echo "export CCD_DEF_GEN_APP_SERVICE_BASE_URL=http://civil-service-perftest.service.core-compute-perftest.internal"
