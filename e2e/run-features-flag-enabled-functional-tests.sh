#!/bin/bash
set -ex

echo "Run Functional tests with all feature flags enabled ccd def file"

./run-unspec-functional-tests.sh
./run-spec-functional-tests.sh
./run-sdo-functional-tests.sh
