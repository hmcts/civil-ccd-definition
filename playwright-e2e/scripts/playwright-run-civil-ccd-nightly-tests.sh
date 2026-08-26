if [ "$RUN_FAILED_TESTS" != "true" ]; then
  PLAYWRIGHT_LAST_RUN_REPORT='playwright-functional-test-results/civil-ccd-nightly/.last-run.json'

  if [ ! -f "$PLAYWRIGHT_LAST_RUN_REPORT" ] || [ ! -s "$PLAYWRIGHT_LAST_RUN_REPORT" ]; then
    echo ".last-run.json not found or is empty."
    exit 1
  elif [ "$(jq -r '.status // empty' "$PLAYWRIGHT_LAST_RUN_REPORT")" = "passed" ]; then
    echo ".last-run.json status is passed"
    exit 0
  elif [ "$(jq -r '.status // empty' "$PLAYWRIGHT_LAST_RUN_REPORT")" = "failed" ]; then
    yarn test:playwright:setup:install
    yarn test:playwright:civil-ccd-nightly:ci
  else
    LAST_RUN_STATUS=$(jq -r '.status // empty' "$PLAYWRIGHT_LAST_RUN_REPORT")
    echo ".last-run.json status is '$LAST_RUN_STATUS', expected 'passed' or 'failed'"
    exit 1
  fi
else
  yarn test:playwright:setup:install
  yarn test:playwright:civil-ccd-nightly:ci
fi
