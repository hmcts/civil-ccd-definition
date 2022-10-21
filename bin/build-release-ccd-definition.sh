#!/bin/bash

set -eu

environment=${1:-prod}
excludeNonProdFiles=${2:-true}

if [ ${environment} == preview ]; then
   excludedFilenamePatterns="-e *-prod.json,*HNL-nonprod.json,*CUI.json,*CUI-nonprod.json,*CUI-prod.json"
   #for testing HNL uplifting, comment the above line and uncomment below
   #excludedFilenamePatterns="-e *-prod.json,*-SDO-nonprod.json"
elif [ ${environment} == demo ]; then
  excludedFilenamePatterns="-e UserProfile.json,*-prod.json,*HNL-nonprod.json"
elif [ ${environment} == local ]; then
  excludedFilenamePatterns="-e *-prod.json"
elif [ ${excludeNonProdFiles} == true ]; then
  excludedFilenamePatterns="-e UserProfile.json,*-nonprod.json,*GAspec.json,*DJ.json,*DJspec.json,*DJ-SDO-nonprod.json,*DJ-nonprod.json,*-SDO-HNL-nonprod.json,*CUI.json,*CUI-prod.json"
else
  excludedFilenamePatterns="-e UserProfile.json,*GAspec.json,*-prod.json,*DJ.json,*DJspec.json,*-SDO-HNL-nonprod.json,*CUI.json,*CUI-prod.json"
fi

root_dir=$(realpath $(dirname ${0})/..)
config_dir=${root_dir}/ccd-definition
build_dir=${root_dir}/build/ccd-release-config
github_dir=${root_dir}/build/github-release
release_definition_output_file=${build_dir}/civil-ccd-${environment}.xlsx
github_file=${github_dir}/civil-ccd-${environment}.xlsx

mkdir -p ${build_dir}
mkdir -p ${github_dir}

# build the ccd definition file
${root_dir}/bin/utils/process-definition.sh ${config_dir} ${release_definition_output_file} "${excludedFilenamePatterns}"

cp ${release_definition_output_file} ${github_file}
