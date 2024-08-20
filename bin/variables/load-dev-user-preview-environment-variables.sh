#!/usr/bin/env bash

set -eu
user=$(whoami)
echo "User directory: /Users/$user"

source .env.local

ENVIRONMENT=preview
# urls
URL=$XUI_WEBAPP_URL
CIVIL_SERVICE_URL=$JAVA_URL
SERVICE_AUTH_PROVIDER_API_BASE_URL="http://rpe-service-auth-provider-aat.service.core-compute-aat.internal"
IDAM_API_BASE_URL="https://idam-api.aat.platform.hmcts.net"
IDAM_API_URL="https://idam-api.aat.platform.hmcts.net"
CCD_IDAM_REDIRECT_URL="https://ccd-case-management-web-aat.service.core-compute-aat.internal/oauth2redirect"
CAMUNDA_BASE_URL=$CAMUNDA_URL
CCD_CONFIGURER_IMPORTER_USERNAME=$(az keyvault secret show --vault-name civil-aat --name ccd-importer-username --query value -o tsv)
CCD_CONFIGURER_IMPORTER_PASSWORD=$(az keyvault secret show --vault-name civil-aat --name ccd-importer-password --query value -o tsv)
CCD_API_GATEWAY_IDAM_CLIENT_SECRET=$(az keyvault secret show --vault-name ccd-aat --name ccd-api-gateway-oauth2-client-secret --query value -o tsv)
CCD_API_GATEWAY_S2S_SECRET=$(az keyvault secret show --vault-name s2s-aat --name microservicekey-ccd-gw --query value -o tsv)
S2S_SECRET=$(az keyvault secret show --vault-name civil-aat --name microservicekey-civil-service --query value -o tsv)
# definition placeholders
CCD_DEF_CASE_SERVICE_BASE_URL=$JAVA_URL
