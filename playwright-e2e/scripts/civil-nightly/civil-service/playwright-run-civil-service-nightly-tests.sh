#!/bin/bash
set -e

export PLAYWRIGHT_NIGHTLY_COMMAND="test:playwright:civil-service-nightly:ci"

source "$(dirname "${BASH_SOURCE[0]}")/../civil-nightly.sh"
