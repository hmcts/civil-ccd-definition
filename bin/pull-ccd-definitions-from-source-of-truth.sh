#!/usr/bin/env bash
#
# Makes ccd-definition/civil and ccd-definition/generalapplication hold the definitions from whichever repo is
# the source of truth for them. Jenkinsfile_CNP runs it before every stage that builds or imports them.
#
# It runs civil-service's bin/shared/pull-ccd-definitions.sh with "-" as the civil-ccd-definition ref:
#   - ccd-definition/SOURCE_OF_TRUTH absent at the civil-service ref: civil-ccd-definition is the source of
#     truth, and this checkout is left exactly as it is.
#   - present: civil/ and generalapplication/ are replaced with civil-service's at that ref.
#
# That script is fetched from civil-service master every time, not taken from bin/shared, because bin/shared
# can come from a civilShared:<branch> label whose branch may be older than the script.
#
# Usage: pull-ccd-definitions-from-source-of-truth.sh [civil-service ref]
#   civil-service ref: branch, tag, full commit SHA, or pr-N for the head of pull request N. Default master.
#
# Any fetch failure is an error, so a network failure can't quietly build the wrong definitions.

set -euo pipefail

civilServiceRef=${1:-master}
rootDir=$(cd "$(dirname "$0")/.." && pwd)

workDir=$(mktemp -d)
trap 'rm -rf "${workDir}"' EXIT

# One commit, no file contents up front: git show then downloads just the one script.
git clone -q --filter=blob:none --no-checkout --depth 1 --branch master \
  https://github.com/hmcts/civil-service.git "${workDir}/civil-service"
git -C "${workDir}/civil-service" show HEAD:bin/shared/pull-ccd-definitions.sh > "${workDir}/pull-ccd-definitions.sh"

bash "${workDir}/pull-ccd-definitions.sh" "${civilServiceRef}" - "${rootDir}/ccd-definition"
