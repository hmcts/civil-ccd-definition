#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

yarn test:non-prod-e2e-ft

