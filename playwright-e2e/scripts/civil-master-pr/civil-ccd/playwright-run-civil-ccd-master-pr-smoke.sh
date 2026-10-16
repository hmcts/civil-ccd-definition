#!/bin/bash
set -e

export PLAYWRIGHT_SETUP_COMMAND="test:playwright:setup:civil-ccd:ci"
export PLAYWRIGHT_SMOKE_COMMAND="test:playwright:civil-ccd-master-pr-smoke:ci"

source "$(dirname "${BASH_SOURCE[0]}")/../civil-master-pr-smoke.sh"
