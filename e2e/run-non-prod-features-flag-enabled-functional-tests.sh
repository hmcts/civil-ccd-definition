#!/bin/bash
set -ex

echo "Run Non prod Functional tests with all feature flags enabled in ccd def file"

dir=$(dirname ${0})

${dir}/run-spec-functional-tests.sh
${dir}/run-sdo-functional-tests.sh
${dir}/run-dj-functional-tests.sh
