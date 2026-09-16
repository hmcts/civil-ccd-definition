#!/bin/bash
set -e

source "$(dirname "${BASH_SOURCE[0]}")/../common.sh"

run_playwright_setup() {
  echo "Running playwright setup tests on ${ENVIRONMENT} env"
  yarn test:playwright:setup:install
  if ! yarn test:playwright:setup:civil-ccd:ci; then
    write_report_flags true false
    exit 1
  fi
}

run_smoke_tests() {
  echo "Running playwright smoke tests on ${ENVIRONMENT} env"
  yarn test:playwright:setup:install
  if ! PLAYWRIGHT_SMOKE=true yarn test:playwright:civil-ccd-smoke:ci; then
    write_report_flags true true
    exit 1
  fi
  exit 0
}

#MAIN SCRIPT

write_report_flags false false

# Check if the playwrightTestFilesReport json or last run json is not found or is empty.
if report_missing_or_empty "$PLAYWRIGHT_TEST_FILES_REPORT" || report_missing_or_empty "$PLAYWRIGHT_LAST_RUN_REPORT"; then
  run_playwright_setup
  run_smoke_tests
fi

mv "$PLAYWRIGHT_TEST_FILES_REPORT" "$PREV_PLAYWRIGHT_TEST_FILES_REPORT"
cp "$PLAYWRIGHT_LAST_RUN_REPORT" "$PREV_PLAYWRIGHT_LAST_RUN_REPORT"

#Check if latest current git commit is the not the same as git commit of prev playwright test files report 
if previous_commit_changed; then 
  run_playwright_setup
  run_smoke_tests

# Check if the previous last run json is not found or is empty.
elif report_missing_or_empty "$PREV_PLAYWRIGHT_LAST_RUN_REPORT"; then
  run_playwright_setup
  run_smoke_tests
  
# Check if the previous last run json has status passed.
elif previous_run_has_status_passed; then
  exit 0

# Check if the previous last run json has a status other than failed.
elif ! previous_run_has_status_failed; then
  run_playwright_setup
  run_smoke_tests

else 
  run_playwright_setup
  run_smoke_tests
fi
