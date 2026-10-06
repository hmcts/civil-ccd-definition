#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <environment>" >&2
  exit 2
fi

gradle_args=(--no-daemon)
if [[ -n "${BEFTA_GRADLE_INIT_SCRIPT:-}" ]]; then
  gradle_args+=(--init-script "$BEFTA_GRADLE_INIT_SCRIPT")
fi

exec ./gradlew "${gradle_args[@]}" highLevelDataSetup "--args=$1"
