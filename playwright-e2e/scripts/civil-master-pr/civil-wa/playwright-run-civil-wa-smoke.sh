#!/bin/bash
set -e

export PLAYWRIGHT_SETUP_COMMAND="test:playwright:setup:civil-wa:ci"
export PLAYWRIGHT_SMOKE_COMMAND="test:playwright:civil-wa-smoke:ci"

source "$(dirname "${BASH_SOURCE[0]}")/../civil-smoke.sh"
