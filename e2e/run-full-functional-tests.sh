#!/bin/bash
set -ex

yarn playwright install

echo "Running Functional tests on ${ENVIRONMENT} env"

# Define path to failedTestFiles.json
FAILED_TEST_FILES_JSON="./test-results/functional/failedTestFiles.json"

# Check if RUN_FAILED_TEST_FILES is set to "true"
if [ "$RUN_FAILED_TEST_FILES" != "true" ]; then
  yarn test:e2e-nightly-prod

# Check if failedTestFiles.json exists and is non-empty
elif [ ! -f "$FAILED_TEST_FILES_JSON" ] || [ ! -s "$FAILED_TEST_FILES_JSON" ]; then
  echo "failedTestFiles.json not found or is empty."
  echo "Last test suite may not have finished/executed or process may have aborted/failed"
  exit 1

# Check if the JSON array inside failedTestFiles.json is empty
elif [ "$(jq 'length' "$FAILED_TEST_FILES_JSON")" -eq 0 ]; then
  echo "failedTestFiles.json contains an empty array."
  exit 1

else
  # Collect array elements into a comma-separated string
  FAILED_TEST_FILES=$(jq -r '.[]' "$FAILED_TEST_FILES_JSON" | paste -sd "," -)

  # If no failed tests, set FAILED_TEST_FILES to empty string
  FAILED_TEST_FILES=${FAILED_TEST_FILES:-""}

  if [ -z "$FAILED_TEST_FILES" ]; then
    echo "No failed tests found."
    exit 1
  else
    # Export as environment variable
    export FAILED_TEST_FILES

    # Optionally print it for confirmation
    echo "FAILED_TEST_FILES='$FAILED_TEST_FILES'"

    yarn test:e2e-nightly-prod
  fi
fi
