#!/usr/bin/env bash

set -eu

definition_processor_version=latest

definition_dir=${1}
definition_output_file=${2}
additionalParameters=${3-}

definition_input_dir=${definition_dir}

if [[ ! -e ${definition_output_file} ]]; then
   touch ${definition_output_file}
fi

docker run --rm --name json2xlsx \
  -v ${definition_input_dir}:/tmp/ccd-definition \
  -v ${definition_output_file}:/tmp/ccd-definition.xlsx \
  -e CCD_DEF_CASE_SERVICE_BASE_URL=${CCD_DEF_CASE_SERVICE_BASE_URL:-http://docker.for.mac.localhost:4000} \
  -e CCD_DEF_GEN_APP_SERVICE_BASE_URL=${CCD_DEF_GEN_APP_SERVICE_BASE_URL:-http://docker.for.mac.localhost:4550} \
  -e CCD_DEF_AAC_URL=${CCD_DEF_AAC_URL:-http://manage-case-assignment:4454} \
  -e CCD_DEF_VERSION=${CCD_DEF_VERSION:-} \
  hmctspublic.azurecr.io/ccd/definition-processor:${definition_processor_version} \
  json2xlsx -D /tmp/ccd-definition -o /tmp/ccd-definition.xlsx ${additionalParameters}
