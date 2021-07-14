#!/usr/bin/env bash

set -eu

echo 'export ENVIRONMENT=demo'

# urls
echo "export S2S_URL_BASE=http://rpe-service-auth-provider-demo.service.core-compute-demo.internal"
echo "export IDAM_API_URL_BASE=https://idam-api.demo.platform.hmcts.net"
echo "export CCD_IDAM_REDIRECT_URL=https://www-ccd.demo.platform.hmcts.net/oauth2redirect"
echo "export DEFINITION_STORE_URL_BASE=http://ccd-definition-store-api-demo.service.core-compute-demo.internal"

# definition placeholders
echo "export CCD_DEF_CASE_SERVICE_BASE_URL=http://civil-service-demo.service.core-compute-demo.internal"
