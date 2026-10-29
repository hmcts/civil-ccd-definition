#!/usr/bin/env bash

set -euo pipefail

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
subject="${script_dir}/pull-latest-camunda-files.sh"
test_dir=$(mktemp -d "${TMPDIR:-/tmp}/civil-bpmn-source-test.XXXXXX")
trap 'rm -rf "${test_dir}"' EXIT

source_repo="${test_dir}/source"
workspace="${test_dir}/workspace"
mkdir -p "${source_repo}" "${workspace}/bin" "${test_dir}/temp"
git -C "${source_repo}" init --quiet --initial-branch=master
git -C "${source_repo}" config user.name 'BPMN source test'
git -C "${source_repo}" config user.email 'bpmn-test@example.invalid'
mkdir -p "${source_repo}/src/main/resources/camunda"
printf 'master diagram\n' > "${source_repo}/src/main/resources/camunda/master.bpmn"
git -C "${source_repo}" add .
git -C "${source_repo}" commit --quiet -m 'master BPMN'
git -C "${source_repo}" checkout --quiet --detach
rm "${source_repo}/src/main/resources/camunda/master.bpmn"
printf 'PR diagram\n' > "${source_repo}/src/main/resources/camunda/pr.bpmn"
git -C "${source_repo}" add .
git -C "${source_repo}" commit --quiet -m 'PR BPMN'
git -C "${source_repo}" update-ref refs/pull/8522/head HEAD

# Keep the production fetch URL but resolve it to a local fixture; no network or deployment.
export GIT_CONFIG_GLOBAL="${test_dir}/gitconfig"
export GIT_CONFIG_NOSYSTEM=1
git config --file "${GIT_CONFIG_GLOBAL}" "url.file://${source_repo}.insteadOf" https://github.com/hmcts/civil-service.git
export TMPDIR="${test_dir}/temp"
cat > "${workspace}/bin/import-bpmn-diagram.sh" <<'EOF'
#!/usr/bin/env bash
set -eu
[ "$1" = '.' ]
printf 'import\n' >> imports.log
EOF
chmod +x "${workspace}/bin/import-bpmn-diagram.sh"
cd "${workspace}"

mkdir camunda
printf 'stale diagram\n' > camunda/retired.bpmn
bash "${subject}"
[ -f camunda/master.bpmn ] && [ ! -e camunda/retired.bpmn ]
echo 'PASS: defaults to civil-service master and removes stale diagrams'

bash "${subject}" pr-8522
[ -f camunda/pr.bpmn ] && [ ! -e camunda/master.bpmn ]
[ "$(wc -l < imports.log | tr -d ' ')" = '2' ]
echo 'PASS: imports the selected Civil Service PR instead of master'

bash "${subject}" pr8522
[ -f camunda/pr.bpmn ]
[ "$(wc -l < imports.log | tr -d ' ')" = '3' ]
echo 'PASS: accepts the same pr8522 shorthand as CUI master'

if bash "${subject}" pr-9999 > "${test_dir}/failed-fetch.log" 2>&1; then
  echo 'FAIL: missing PR must fail' >&2
  exit 1
fi
[ -f camunda/pr.bpmn ]
[ "$(wc -l < imports.log | tr -d ' ')" = '3' ]
[ -z "$(find "${TMPDIR}" -mindepth 1 -print -quit)" ]
echo 'PASS: missing PR fails without importing, falling back, or leaving temporary checkouts'
