#!/usr/bin/env sh

# Source this script to export USER_TOKEN and SERVICE_TOKEN for reuse.
# Usage: . ./bin/utils/idam-get-tokens.sh

set -e

export USER_TOKEN=$(./bin/utils/idam-lease-user-token.sh ${DEFINITION_IMPORTER_USERNAME} ${DEFINITION_IMPORTER_PASSWORD})
export SERVICE_TOKEN=$(./bin/utils/idam-lease-service-token.sh ccd_gw $(docker run --rm hmctspublic.azurecr.io/imported/toolbelt/oathtool --totp -b ${CCD_API_GATEWAY_S2S_SECRET:-AAAAAAAAAAAAAAAC}))
