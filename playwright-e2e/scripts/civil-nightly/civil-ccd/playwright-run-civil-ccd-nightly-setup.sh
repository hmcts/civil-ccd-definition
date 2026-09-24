#!/bin/bash
set -e

export PLAYWRIGHT_SETUP_COMMAND="test:playwright:setup:civil-ccd:ci"

source "$(dirname "${BASH_SOURCE[0]}")/../civil-nightly-setup.sh"
