#!/bin/bash
set -e

source "$(dirname "${BASH_SOURCE[0]}")/../common.sh"

compare_ft_groups() {
  local ft_groups_csv pr_ft_groups_csv

  #Extract ftGroups array as a comma-separated string (sorted)
  ft_groups_csv=$(jq -r '
    if (.ftGroups == null or (.ftGroups | length == 0)) 
    then "" 
    else (.ftGroups | sort | join(",")) 
    end
  ' "$PREV_PLAYWRIGHT_TEST_FILES_REPORT")

  #Normalize PR_FT_GROUPS (sort, trim spaces, split by comma, then rejoin sorted)
  pr_ft_groups_csv=""
  if [ -n "$PLAYWRIGHT_PR_FT_GROUPS" ]; then
    pr_ft_groups_csv=$(echo "$PLAYWRIGHT_PR_FT_GROUPS" | tr ',' '\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | sort | paste -sd "," -)
  fi

  #Comparison logic
  if [ "$ft_groups_csv" = "$pr_ft_groups_csv" ]; then
    return 0  # true — they match
  else
    return 1  # false — they differ
  fi
}

run_functional_test_groups() {
  command="yarn test:playwright:civil-ccd-pr:ci --grep "
  pr_ft_groups=$(echo "$PLAYWRIGHT_PR_FT_GROUPS" | awk '{print tolower($0)}')
  
  regex_pattern=""

  IFS=',' read -ra ft_groups_array <<< "$pr_ft_groups"

  for ft_group in "${ft_groups_array[@]}"; do
      if [ -n "$regex_pattern" ]; then
          regex_pattern+="|"
      fi
      regex_pattern+="@$ft_group"
  done

  command+="'$regex_pattern'"
  echo "Executing: $command"
  eval "$command"
}

run_failed_functional_tests() {
  echo "Running failed playwright functional tests on ${ENVIRONMENT} env"
  export PLAYWRIGHT_FUNCTIONAL=true
  if [ "$ENVIRONMENT" = "aat" ]; then
    yarn test:playwright:civil-ccd-master:ci --last-failed
  else
    yarn test:playwright:civil-ccd-pr:ci --last-failed
  fi
  exit 0
}

run_functional_tests() {
  echo "Running functional playwright tests on ${ENVIRONMENT} env"
  export PLAYWRIGHT_FUNCTIONAL=true
  echo "Running all functional tests on ${ENVIRONMENT} env"
  if [ "$ENVIRONMENT" = "aat" ]; then
    yarn test:playwright:civil-ccd-master:ci
  elif [ -z "$PR_FT_GROUPS" ]; then
    yarn test:playwright:civil-ccd-pr:ci
  else
    run_functional_test_groups
  fi
  exit 0
}

#MAIN SCRIPT

# Check if SKIP_FUNCTIONAL_TESTS is set to true
if should_skip_functional_tests; then
  exit 0

#Check if RUN_ALL_FUNCTIONAL_TESTS is set to true
elif [ "$RUN_ALL_FUNCTIONAL_TESTS" = "true" ]; then
  echo "The label 'runAllFunctionalTests' exists on the PR."
  echo "Running all fucntional tests."
  run_functional_tests

#Check if latest current git commit is the not the same as git commit of prev playwright test files report 
if previous_commit_changed; then 
  run_functional_tests

# Check if the previous last run json is not found or is empty.
elif report_missing_or_empty "$PREV_PLAYWRIGHT_LAST_RUN_REPORT"; then
  run_functional_tests
  
# Check if the previous last run json has status passed.
elif previous_run_has_status_passed; then
  exit 0

# Check if the previous last run json has a status other than failed.
elif ! previous_run_has_status_failed; then
  run_functional_tests

else
  run_failed_functional_tests

fi