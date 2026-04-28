#!/usr/bin/env bash

set -eu

echo 'export ENVIRONMENT=perftest'
# Internal cluster URLs use HTTP (no TLS certs for internal k8s services)
echo "export CCD_DEF_CASE_SERVICE_BASE_URL=http://civil-service-perftest.service.core-compute-perftest.internal" # NOSONAR - internal cluster URL
echo "export CCD_DEFINITION_STORE_API_BASE_URL=http://ccd-definition-store-api-perftest.service.core-compute-perftest.internal" # NOSONAR - internal cluster URL
echo "export IDAM_API_BASE_URL=https://idam-api.perftest.platform.hmcts.net"
echo "export SERVICE_AUTH_PROVIDER_API_BASE_URL=http://rpe-service-auth-provider-perftest.service.core-compute-perftest.internal" # NOSONAR - internal cluster URL
