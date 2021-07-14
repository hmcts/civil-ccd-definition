#!/usr/bin/env bash

set -eu

echo 'export ENVIRONMENT=aat'

# urls
echo "export S2S_URL_BASE=http://rpe-service-auth-provider-aat.service.core-compute-aat.internal"
echo "export IDAM_API_URL_BASE=https://idam-api.aat.platform.hmcts.net"
echo "export CCD_IDAM_REDIRECT_URL=https://ccd-case-management-web-aat.service.core-compute-aat.internal/oauth2redirect"
echo "export DEFINITION_STORE_URL_BASE=http://ccd-definition-store-api-aat.service.core-compute-aat.internal"

# definition placeholders
echo "export CCD_DEF_CASE_SERVICE_BASE_URL=http://civil-service-aat.service.core-compute-aat.internal"
