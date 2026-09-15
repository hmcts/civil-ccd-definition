#!/bin/bash

# Shared report paths; source after configuring the results directory and project.
PLAYWRIGHT_TEST_FILES_REPORT="${PLAYWRIGHT_FUNCTIONAL_TEST_RESULTS_DIR}/${PLAYWRIGHT_FUNCTIONAL_TEST_RESULTS_PROJECT_DIR}/playwrightTestFilesReport.json"
PREV_PLAYWRIGHT_TEST_FILES_REPORT="${PLAYWRIGHT_FUNCTIONAL_TEST_RESULTS_DIR}/prevPlaywrightTestFilesReport.json"
PLAYWRIGHT_LAST_RUN_REPORT="${PLAYWRIGHT_FUNCTIONAL_TEST_RESULTS_DIR}/${PLAYWRIGHT_FUNCTIONAL_TEST_RESULTS_PROJECT_DIR}/.last-run.json"
PREV_PLAYWRIGHT_LAST_RUN_REPORT="${PLAYWRIGHT_FUNCTIONAL_TEST_RESULTS_DIR}/.prev-last-run.json"

# Returns success when the report is unavailable so callers can choose the action.
report_missing_or_empty() {
  local report="$1"

  if [ ! -f "$report" ] || [ ! -s "$report" ]; then
    echo "${report##*/} not found or is empty."
    return 0
  fi

  return 1
}

# Predicates are called from if/elif; callers retain control of exits and test runs.
previous_commit_changed() {
  if [ "$(jq -r 'if .gitCommitId == null then "__NULL__" else .gitCommitId end' "$PREV_PLAYWRIGHT_TEST_FILES_REPORT")" != "$GIT_COMMIT" ]; then
    echo "The gitCommitId does not match the current GIT_COMMIT."
    return 0
  fi
  return 1
}

previous_run_has_status() {
  local expected_status="$1"
  [ "$(jq -r '.status // empty' "$PREV_PLAYWRIGHT_LAST_RUN_REPORT")" = "$expected_status" ]
}

previous_run_has_status_passed() {
  if previous_run_has_status passed; then
    echo ".prev-last-run.json status is passed"
    return 0
  fi
  return 1
}

previous_run_has_status_failed() {
  if previous_run_has_status failed; then
    return 0
  fi

  local previous_status
  # Preserve the caller's failure on unreadable JSON, even inside an if condition.
  previous_status=$(jq -r '.status // empty' "$PREV_PLAYWRIGHT_LAST_RUN_REPORT") || exit $?
  echo ".prev-last-run.json status is '$previous_status', expected 'passed' or 'failed'"
  return 1
}

should_skip_functional_tests() {
  if [ "$SKIP_FUNCTIONAL_TESTS" = "true" ]; then
    echo "The label 'pr-values:skip-functional-tests' exists on the PR."
    echo "Skipping functional tests."
    return 0
  fi
  return 1
}

should_run_failed_tests() {
  [ "$RUN_FAILED_TESTS" = "true" ]
}
