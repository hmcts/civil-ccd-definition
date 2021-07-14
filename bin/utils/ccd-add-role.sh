#!/usr/bin/env bash

set -eu

dir=$(dirname ${0})

role=${1}

userToken=$(${dir}/idam-lease-user-token.sh ${DEFINITION_IMPORTER_USERNAME:-ccd.docker.default@hmcts.net} ${DEFINITION_IMPORTER_PASSWORD:-Password12!})
serviceToken=$(${dir}/idam-lease-service-token.sh ccd_gw $(docker run --rm toolbelt/oathtool --totp -b ${CCD_API_GATEWAY_S2S_KEY:-AAAAAAAAAAAAAAAC}))

echo "Creating CCD role: ${role}"

curl --insecure --fail --show-error --silent --output /dev/null -X PUT \
  ${DEFINITION_STORE_URL_BASE:-http://localhost:4451}/api/user-role \
  -H "Authorization: Bearer ${userToken}" \
  -H "ServiceAuthorization: Bearer ${serviceToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "'${role}'",
    "security_classification": "PUBLIC"
  }'
