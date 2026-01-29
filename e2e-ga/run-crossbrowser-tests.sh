#!/bin/bash
set -ex

if [ "$FORCE_GREEN_BUILD" == "true" ]; then
  echo "Manually forced green build, no functional tests will be run."
  exit 0
fi

export CCD_UI_TESTS=true

if [[ "$BROWSER_GROUP" == "" ]]
then
    EXIT_STATUS=0
    BROWSER_GROUP=chrome yarn test:crossbrowser-ui || EXIT_STATUS=$?
    BROWSER_GROUP=firefox yarn test:crossbrowser-ui || EXIT_STATUS=$?
    BROWSER_GROUP=edge yarn test:crossbrowser-ui || EXIT_STATUS=$?
    BROWSER_GROUP=safari yarn test:crossbrowser-ui || EXIT_STATUS=$?
    echo EXIT_STATUS: $EXIT_STATUS
else
    # Compatible with Jenkins parallel crossbrowser pipeline
    yarn test:crossbrowser-ui
fi