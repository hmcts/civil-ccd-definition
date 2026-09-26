#!/bin/bash
set -e

export PLAYWRIGHT_SMOKE_COMMAND="test:playwright:civil-ccd-nightly-smoke:ci"

source "$(dirname "${BASH_SOURCE[0]}")/../civil-nightly-smoke.sh"
