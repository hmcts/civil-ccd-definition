#!/bin/bash

set -eu

root_dir=$(realpath $(dirname ${0})/..)
config_dir=${root_dir}/ccd-definition
release_definition_output_file=${root_dir}/e2e/civil-ccd-test.xlsx

# build the ccd definition file
${root_dir}/bin/utils/process-definition.sh ${config_dir} ${release_definition_output_file} "-e *-prod.json,*CUI.json,*CUI-nonprod.json,*-GAR2GAspec-nonprod.json"
