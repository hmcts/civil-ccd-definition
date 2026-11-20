#!/bin/bash
# Runs the playwright-tests journeys on a pipeline (Jenkinsfile_CNP and Jenkinsfile_nightly):
#
#   playwright-tests/scripts/pipeline/run-journeys.sh smoke        the smoke test (@spec-smoke)
#   playwright-tests/scripts/pipeline/run-journeys.sh functional   a PR's set on its preview (@unspec-pr, @spec-pr), or
#                                                                  master's on AAT (@unspec-master, @spec-master)
#   playwright-tests/scripts/pipeline/run-journeys.sh nightly      the nightly set (@unspec-nightly, @spec-nightly)
#
# The pipeline sets the environment's addresses and secrets (there is no playwright-tests/env/.env.<ENV> on Jenkins).
# This script fills in what the Jenkinsfiles do not set, then runs every project of the set in one Playwright run, so
# the preflight checks, the sign-ins and the case unassignment happen once.
#
# Like the playwright-e2e scripts it replaces, it does not repeat work a build of the same commit has done. After each
# run it writes playwright-test-results/journeys-state/<set>.properties (the commit, whether the run passed and the
# scenarios that failed). When the pipeline copies that file from the last build:
#  - smoke and functional, same commit and the same scenarios chosen: a set that passed is skipped, and a set that
#    failed only runs its failed scenarios again (from the start: a journey's tests depend on each other, so
#    Playwright's --last-failed cannot be used)
#  - nightly with RUN_FAILED_TESTS=true: the nightly set's failed scenarios are run again, whatever the commit
#
# Settings it reads (all optional):
#   ENVIRONMENT                          aat, preview, demo or ithc (Jenkins sets it)
#   CHANGE_ID / PR_NUMBER                the PR, for a preview
#   JOURNEY_SCENARIOS                    a comma list of scenario names, run instead of the set (functional only)
#   PLAYWRIGHT_SKIP_FUNCTIONAL_TESTS     true skips smoke and functional (the pr-values:skip-functional-tests label)
#   PLAYWRIGHT_RUN_ALL_FUNCTIONAL_TESTS  true runs the whole set even if this commit passed (the runAllFunctionalTests
#                                        label)
#   RUN_FAILED_TESTS                     true runs the nightly set's failed scenarios again
#   FORCE_GREEN_BUILD                    true runs nothing (nightly)
#   WORKERS                              scenarios at once (default 8 on a preview, like the playwright-e2e PR tests, so
#                                        the PR set's scenarios all start together; 4 elsewhere, as AAT is shared)
#   SCENARIO_API_UNTIL                   the PR set's API_UNTIL (default All_FINAL_ORDERS_ISSUED): every PR scenario but
#                                        UNSPEC_1v1_FAST, which stays in the UI, goes through the CCD API, as the nightly
#                                        set has the full UI journeys. Master and nightly runs are not affected.
#   PAYMENT_METHOD                       PBA or CARD (default CARD: AAT's PBA accounts have been failing)
set -eu

stage="${1:-}"
results_dir="playwright-test-results"
state_dir="${results_dir}/journeys-state"
json_report="${results_dir}/journeys-report.json"
git_commit="${GIT_COMMIT:-$(git rev-parse HEAD 2>/dev/null || echo unknown)}"
selection="${JOURNEY_SCENARIOS:-}"

case "$stage" in
  smoke)
    set_name="smoke"
    projects=(spec-smoke)
    ;;
  functional)
    if [ "${ENVIRONMENT:-}" = "aat" ]; then
      set_name="master"
      projects=(unspec-master spec-master)
    else
      set_name="pr"
      projects=(unspec-pr spec-pr)
    fi
    ;;
  nightly)
    set_name="nightly"
    projects=(unspec-nightly spec-nightly)
    ;;
  *)
    echo "Usage: $0 smoke|functional|nightly" >&2
    exit 2
    ;;
esac
state_file="${state_dir}/${set_name}.properties"

# A value from the last build's state file for this set, empty when there is none
previous() {
  local file="$1" key="$2"
  if [ -f "$file" ]; then
    grep "^${key}=" "$file" | tail -n 1 | cut -d '=' -f 2- || true
  fi
}

# The Playwright --grep for a comma list of scenario names: each name is also a tag (@UNSPEC_1v1_FAST etc.)
grep_for_scenarios() {
  echo "$1" | tr ',' '\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | grep -v '^$' | sed 's/.*/@&\\b/' | paste -sd '|' -
}

# Writes this run's state, for the next build of the pipeline to read
write_state() {
  local status="$1" failed="$2"
  mkdir -p "$state_dir"
  {
    echo "GIT_COMMIT=${git_commit}"
    echo "SELECTION=${selection}"
    echo "STATUS=${status}"
    echo "FAILED_SCENARIOS=${failed}"
    # The Jenkins build that ran it, so the pipeline can tell this build's result from one copied from the last build
    echo "BUILD_TAG=${BUILD_TAG:-}"
  } > "$state_file"
}

# The scenarios with a failed test in this run's JSON report, as a comma list. Each scenario's journey is a describe
# block named after it, inside its test file's suite. Empty when the report is missing or unreadable (a run that
# crashed), so the run's own result is still recorded and returned.
failed_scenarios() {
  if [ ! -s "$json_report" ]; then
    return 0
  fi
  jq -r '[.suites[]?.suites[]? | select([.. | objects | select(has("ok")) | .ok] | any(. == false)) | .title] | unique | join(",")' "$json_report" 2>/dev/null \
    || echo "The JSON report ${json_report} could not be read, so the failed scenarios are not known." >&2
}

if [ "${FORCE_GREEN_BUILD:-false}" = "true" ]; then
  echo "Manually forced green build, so the playwright-tests journeys are not run."
  exit 0
fi

if [ "$stage" != "nightly" ] && [ "${PLAYWRIGHT_SKIP_FUNCTIONAL_TESTS:-false}" = "true" ]; then
  echo "The label 'pr-values:skip-functional-tests' is on the PR, so the playwright-tests journeys are not run."
  exit 0
fi

# What to run: the set's projects, or only some scenarios
grep_pattern=""
if [ "$stage" = "functional" ] && [ -n "$selection" ]; then
  echo "Running the scenarios JOURNEY_SCENARIOS names: ${selection}"
  projects=(chromium)
  grep_pattern="$(grep_for_scenarios "$selection")"
fi

# Whether an earlier build has already done the work
rerun_failed=""
if [ "$stage" = "nightly" ]; then
  if [ "${RUN_FAILED_TESTS:-false}" = "true" ]; then
    if [ "$(previous "$state_file" STATUS)" = "passed" ]; then
      echo "The last nightly run passed, so there are no failed scenarios to run again."
      exit 0
    fi
    rerun_failed="$(previous "$state_file" FAILED_SCENARIOS)"
    if [ -z "$rerun_failed" ]; then
      echo "There is no record of the last nightly run's failed scenarios, so the whole nightly set is run."
    fi
  fi
elif [ "${PLAYWRIGHT_RUN_ALL_FUNCTIONAL_TESTS:-false}" = "true" ]; then
  echo "The label 'runAllFunctionalTests' is on the PR, so the whole set is run."
else
  # The smoke test is skipped when this commit's functional set has already passed, as the playwright-e2e one is
  functional_state="${state_dir}/$([ "${ENVIRONMENT:-}" = "aat" ] && echo master || echo pr).properties"
  check_file="$([ "$stage" = "smoke" ] && echo "$functional_state" || echo "$state_file")"
  if [ "$(previous "$check_file" GIT_COMMIT)" = "$git_commit" ] && [ "$(previous "$check_file" SELECTION)" = "$selection" ]; then
    if [ "$(previous "$check_file" STATUS)" = "passed" ]; then
      echo "The journeys already passed for commit ${git_commit}, so they are not run again."
      exit 0
    fi
    if [ "$stage" = "functional" ]; then
      rerun_failed="$(previous "$state_file" FAILED_SCENARIOS)"
    fi
  fi
fi
if [ -n "$rerun_failed" ]; then
  echo "Running the scenarios that failed last time again: ${rerun_failed}"
  grep_pattern="$(grep_for_scenarios "$rerun_failed")"
fi

# The environment. ENV makes playwright.config.ts define only the playwright-tests projects; with no env file on
# Jenkins, every setting comes from the pipeline and the defaults below.
case "${ENVIRONMENT:-}" in
  aat | preview | demo | ithc) ;;
  *)
    echo "ENVIRONMENT must be aat, preview, demo or ithc for the playwright-tests journeys (it is '${ENVIRONMENT:-}')." >&2
    exit 1
    ;;
esac
export CI=true
export SCENARIOS=Yes
export ENV="$ENVIRONMENT"
if [ "$ENVIRONMENT" = "preview" ]; then
  # The repo the preview belongs to, from its XUI address (xui-civil-ccd-pr-123... is ccd). The nightly job can test
  # any repo's preview; every address comes from the pipeline, so a repo playwright-tests has no settings for (such as
  # civil-general-applications) is run as ccd.
  preview_service="$(echo "${URL:-}" | sed -n 's#^https://xui-civil-\(.*\)-pr-[0-9]*\..*#\1#p')"
  case "$preview_service" in
    ccd | citizen-ui | service) ;;
    *) preview_service="ccd" ;;
  esac
  export PREVIEW_SERVICE="${PREVIEW_SERVICE:-$preview_service}"
  export PR_NUMBER="${PR_NUMBER:-${CHANGE_ID:-}}"
fi
if [ "$ENVIRONMENT" = "preview" ]; then
  export WORKERS="${WORKERS:-8}"
else
  export WORKERS="${WORKERS:-4}"
fi
if [ "$set_name" = "pr" ]; then
  export SCENARIO_API_UNTIL="${SCENARIO_API_UNTIL:-All_FINAL_ORDERS_ISSUED}"
  echo "The PR set goes through the CCD API until ${SCENARIO_API_UNTIL}, apart from the scenarios kept in the UI"
fi
export PAYMENT_METHOD="${PAYMENT_METHOD:-CARD}"
# AAT's addresses for what the Jenkinsfiles do not set. A preview's Camunda and WA task monitor follow its XUI address.
if [ "$ENVIRONMENT" = "aat" ] || [ "$ENVIRONMENT" = "preview" ]; then
  export IDAM_WEB_URL="${IDAM_WEB_URL:-https://idam-web-public.aat.platform.hmcts.net}"
fi
if [ "$ENVIRONMENT" = "aat" ] || [ "$ENVIRONMENT" = "demo" ]; then
  export CAMUNDA_URL="${CAMUNDA_URL:-http://camunda-api-${ENVIRONMENT}.service.core-compute-${ENVIRONMENT}.internal/engine-rest}"
  export WA_TASK_MONITOR_URL="${WA_TASK_MONITOR_URL:-http://wa-task-monitor-${ENVIRONMENT}.service.core-compute-${ENVIRONMENT}.internal}"
fi
export PLAYWRIGHT_JOURNEYS_JSON_REPORT="$json_report"

args=()
for project in "${projects[@]}"; do
  args+=(--project "$project")
done
if [ -n "$grep_pattern" ]; then
  args+=(--grep "$grep_pattern")
fi

echo "Running the playwright-tests ${set_name} journeys on ${ENVIRONMENT} (${WORKERS} at once): npx playwright test ${args[*]}"
mkdir -p "$results_dir"
rm -f "$json_report"
yarn playwright install chromium
status=0
npx playwright test "${args[@]}" || status=$?

failed="$(failed_scenarios)"
if [ "$status" -eq 0 ]; then
  write_state passed ""
  echo "The playwright-tests ${set_name} journeys passed."
else
  write_state failed "$failed"
  echo "The playwright-tests ${set_name} journeys failed. Failed scenarios: ${failed:-none recorded (see the log)}"
fi
exit "$status"
