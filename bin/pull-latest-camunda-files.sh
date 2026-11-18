#!/usr/bin/env bash

set -euo pipefail

# Match civil-citizen-ui: accept pr-8522/pr8522, a branch, tag, or Git ref.
ref_name="${1:-master}"
civil_service_ref="${ref_name}"
if [[ "${ref_name}" =~ ^pr-?([0-9]+)$ ]]; then
  civil_service_ref="refs/pull/${BASH_REMATCH[1]}/head"
fi
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
