#!/usr/bin/env bash
#
# Exits 1 with a message once civil-service owns the CCD definitions, that is once
# ccd-definition/SOURCE_OF_TRUTH is on civil-service master. The manual build scripts run it first, so
# nobody can build stale definitions from this repo's copy for a manual import. The same scripts are in
# civil-service, which builds them from its own copy from then on.
#
# Usage: refuse-once-civil-service-owns-definitions.sh <script name>
#
# It asks civil-service's bin/shared/pull-ccd-definitions.sh --check, fetched from civil-service master, so
# it decides exactly as the pipelines do. Any fetch failure is an error, not a pass.

set -euo pipefail

scriptName=${1:?Usage: refuse-once-civil-service-owns-definitions.sh <script name>}

workDir=$(mktemp -d)
trap 'rm -rf "${workDir}"' EXIT

# One commit, no file contents up front: git show then downloads just the one script.
git clone -q --filter=blob:none --no-checkout --depth 1 --branch master \
  https://github.com/hmcts/civil-service.git "${workDir}/civil-service"
git -C "${workDir}/civil-service" show HEAD:bin/shared/pull-ccd-definitions.sh > "${workDir}/pull-ccd-definitions.sh"

sourceOfTruth=$(bash "${workDir}/pull-ccd-definitions.sh" --check master)

case "${sourceOfTruth}" in
  civil-ccd-definition)
    ;;
  civil-service)
    echo "civil-service now owns the CCD definitions, so this repo's copy is out of date." >&2
    echo "Run bin/${scriptName} in a checkout of hmcts/civil-service instead." >&2
    exit 1
    ;;
  *)
    echo "Couldn't tell which repo owns the CCD definitions (got '${sourceOfTruth}')." >&2
    exit 1
    ;;
esac
