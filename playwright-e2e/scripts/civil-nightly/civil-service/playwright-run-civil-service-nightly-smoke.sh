#!/bin/bash
set -e

export PLAYWRIGHT_SMOKE_COMMAND="test:playwright:civil-service-nightly-smoke:ci"

source "$(dirname "${BASH_SOURCE[0]}")/../civil-nightly-smoke.sh"
