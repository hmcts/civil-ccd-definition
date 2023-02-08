#!/bin/bash

set -eu

environment=${1:-prod}
excludeNonProdFiles=${2:-true}

# if any exclusions are updated here, please also update the exclusions map in e2e/tests/unit/utils/dataProvider.js
if [ ${environment} == preview ]; then
   excludedFilenamePatterns="-e *-prod.json,*HNL-nonprod.json,*CUI.json,*CUI-nonprod.json,*-GAR2GAspec-nonprod.json"
   #for testing HNL uplifting, comment the above line and uncomment below
   #excludedFilenamePatterns="-e *-prod.json,*-base-nonprod.json,*CUI.json,*CUI-nonprod.json"
   #for testing ga enhancements please remove *-GAR2GAspec-nonprod.json which are not required for release 1
elif [ ${environment} == demo ]; then
  excludedFilenamePatterns="-e UserProfile.json,*-prod.json,*HNL-nonprod.json,*CUI-nonprod.json"
elif [ ${environment} == local ]; then
  # upload doesn't currently work with this command due to SDO and SDO-HNL files
  excludedFilenamePatterns="-e *-prod.json"
elif [ ${excludeNonProdFiles} == true ]; then
  excludedFilenamePatterns="-e UserProfile.json,*-nonprod.json,*-COS-nonprod.json,*GAspec.json,*-GAR2GAspec-nonprod.json,*DJ.json,*DJspec.json,*DJ-SDO-nonprod.json,*DJ-nonprod.json,*CUI.json,*CUI-nonprod.json,*-GAR3CP-nonprod.json"
else
  #default
  excludedFilenamePatterns="-e UserProfile.json,*GAspec.json,*-GAR2GAspec-nonprod.json,*-prod.json,*DJ.json,*DJspec.json,*-HNL-nonprod.json,*CUI.json,*CUI-nonprod.json,*-GAR3CP-nonprod.json"
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
