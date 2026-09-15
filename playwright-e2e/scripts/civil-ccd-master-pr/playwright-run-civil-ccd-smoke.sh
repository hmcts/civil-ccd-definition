#!/bin/bash
set -e

source "$(dirname "${BASH_SOURCE[0]}")/../common.sh"

run_smoke_tests() {
  echo "Running playwright smoke tests on ${ENVIRONMENT} env"
  export PLAYWRIGHT_SMOKE=true
  yarn test:playwright:setup:install
  yarn test:playwright:civil-ccd-smoke:ci
  exit 0
}

#MAIN SCRIPT

exit_if_playwright_flow_cannot_continue

#Check if latest current git commit is the not the same as git commit of prev playwright test files report 
if previous_commit_changed; then 
  run_smoke_tests

# Check if the previous last run json is not found or is empty.
elif report_missing_or_empty "$PREV_PLAYWRIGHT_LAST_RUN_REPORT"; then
  run_smoke_tests
  
# Check if the previous last run json has status passed.
elif previous_run_has_status_passed; then
  exit 0

# Check if the previous last run json has a status other than failed.
elif ! previous_run_has_status_failed; then
  run_smoke_tests
else 
  run_smoke_tests
fi
