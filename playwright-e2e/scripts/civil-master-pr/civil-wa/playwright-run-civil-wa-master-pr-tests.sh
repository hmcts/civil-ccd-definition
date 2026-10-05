#!/bin/bash
set -e

export PLAYWRIGHT_PR_COMMAND="test:playwright:civil-wa-pr:ci"
export PLAYWRIGHT_MASTER_COMMAND="test:playwright:civil-wa-master:ci"

source "$(dirname "${BASH_SOURCE[0]}")/../civil-master-pr.sh"
