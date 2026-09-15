#!/bin/bash
set -e

source "$(dirname "${BASH_SOURCE[0]}")/../common.sh"

run_playwright_setup() {
  echo "Running playwright setup tests on ${ENVIRONMENT} env"
  yarn test:playwright:setup:install
  yarn test:playwright:setup:civil-ccd:ci
  exit 0
}

if should_skip_functional_tests; then
  exit 0
fi


# Check if the playwrightTestFilesReport json is not found or is empty.
if report_missing_or_empty "$PLAYWRIGHT_TEST_FILES_REPORT"; then
  run_playwright_setup

# Check if the last run json is not found or is empty.
elif report_missing_or_empty "$PLAYWRIGHT_LAST_RUN_REPORT"; then
  run_playwright_setup
fi

mv "$PLAYWRIGHT_TEST_FILES_REPORT" "$PREV_PLAYWRIGHT_TEST_FILES_REPORT"
cp "$PLAYWRIGHT_LAST_RUN_REPORT" "$PREV_PLAYWRIGHT_LAST_RUN_REPORT"

#Check if latest current git commit is the not the same as git commit of prev playwright test files report 
if previous_commit_changed; then 
  run_playwright_setup

# Check if the previous last run json is not found or is empty.
elif report_missing_or_empty "$PREV_PLAYWRIGHT_LAST_RUN_REPORT"; then
  run_playwright_setup
  
# Check if the previous last run json has status passed.
elif previous_run_has_status_passed; then
  exit 0

# Check if the previous last run json has a status other than failed.
elif ! previous_run_has_status_failed; then
  run_playwright_setup
else 
  run_playwright_setup
fi
