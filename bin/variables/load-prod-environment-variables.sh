#!/usr/bin/env bash

set -eu

echo 'export ENVIRONMENT=prod'

echo "export S2S_URL_BASE=http://rpe-service-auth-provider-prod.service.core-compute-prod.internal"
echo "export IDAM_API_URL_BASE=https://idam-api.prod.platform.hmcts.net"
echo "export CCD_IDAM_REDIRECT_URL=https://www-ccd.prod.platform.hmcts.net/oauth2redirect"
echo "export CCD_DEF_CASE_SERVICE_BASE_URL=http://civil-service-prod.service.core-compute-prod.internal"
echo "export CAMUNDA_BASE_URL=http://civil-ccd-camunda-staging-aat.service.core-compute-aat.internal"
