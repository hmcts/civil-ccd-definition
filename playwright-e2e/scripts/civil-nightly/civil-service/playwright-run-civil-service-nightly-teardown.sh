#!/bin/bash
set -e

export PLAYWRIGHT_TEARDOWN_COMMAND="test:playwright:teardown:civil-service:ci"

source "$(dirname "${BASH_SOURCE[0]}")/../civil-nightly-teardown.sh"
