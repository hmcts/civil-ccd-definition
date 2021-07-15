#!/bin/bash

set -eu

environment=${1:-prod}
excludeNonProdFiles=${2:-true}


if [ ${excludeNonProdFiles} == true ]; then
  excludedFilenamePatterns="-e UserProfile.json,*-nonprod.json"
else
  excludedFilenamePatterns="-e UserProfile.json"
fi

root_dir=$(realpath $(dirname ${0})/..)
config_dir=${root_dir}/ccd-definition
build_dir=${root_dir}/build/ccd-release-config
release_definition_output_file=${build_dir}/civil-ccd-${environment}.xlsx

mkdir -p ${build_dir}

# build the ccd definition file
${root_dir}/bin/utils/process-definition.sh ${config_dir} ${release_definition_output_file} "${excludedFilenamePatterns}"
