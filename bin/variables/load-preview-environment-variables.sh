#!/usr/bin/env bash

set -eu

pr=${1}

echo 'export ENVIRONMENT=preview'

# urls
echo "export SERVICE_AUTH_PROVIDER_API_BASE_URL=http://rpe-service-auth-provider-aat.service.core-compute-aat.internal"
echo "export IDAM_API_BASE_URL=https://idam-api.aat.platform.hmcts.net"
echo "export CCD_IDAM_REDIRECT_URL=https://ccd-case-management-web-aat.aat.platform.hmcts.net/oauth2redirect"
echo "export CCD_DEFINITION_STORE_API_BASE_URL=https://ccd-definition-store-civil-ccd-pr-${pr}.preview.platform.hmcts.net"
echo "export CAMUNDA_BASE_URL=https://camunda-civil-ccd-pr-${pr}.preview.platform.hmcts.net"
echo "export HEALTH_WORK_ALLOCATION_TASK_API=https://wa-task-management-api-civil-ccd-pr-${pr}.preview.platform.hmcts.net/health"

# definition placeholders
echo "export CCD_DEF_CASE_SERVICE_BASE_URL=https://civil-ccd-pr-${pr}.preview.platform.hmcts.net"
echo "export CCD_DEF_GEN_APP_SERVICE_BASE_URL=https://civil-ccd-pr-${pr}.preview.platform.hmcts.net"
