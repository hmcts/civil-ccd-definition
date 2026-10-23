#!/usr/bin/env bash

set -euo pipefail

# Accept a civil-service branch, tag, or PR ref (for example refs/pull/8522/head).
civil_service_ref="${1:-master}"
checkout_dir=$(mktemp -d "${TMPDIR:-/tmp}/civil-service-bpmn.XXXXXX")
trap 'rm -rf "${checkout_dir}"' EXIT

echo "Pulling BPMNs from civil-service (${civil_service_ref})"
git -C "${checkout_dir}" init --quiet
git -C "${checkout_dir}" remote add origin https://github.com/hmcts/civil-service.git
git -C "${checkout_dir}" sparse-checkout init --cone
git -C "${checkout_dir}" sparse-checkout set src/main/resources/camunda
git -C "${checkout_dir}" fetch --depth=1 origin "${civil_service_ref}"
git -C "${checkout_dir}" checkout --detach FETCH_HEAD

# Replace, rather than merge, so reused workspaces cannot deploy retired BPMNs.
rm -rf ./camunda
cp -R "${checkout_dir}/src/main/resources/camunda" ./camunda

./bin/import-bpmn-diagram.sh .
