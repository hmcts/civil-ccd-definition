#!/bin/bash

set -eu

environment=${1:-prod}

# if any exclusions are updated here, please also update the exclusions map in e2e/tests/unit/utils/dataProvider.js
if [ ${environment} == preview ]; then
   excludedFilenamePatterns="-e *-prod.json,*HNL-nonprod.json,*CUI.json,*CUI-nonprod.json"
   #for testing HNL uplifting, comment the above line and uncomment below
   #excludedFilenamePatterns="-e *-prod.json,*-base-nonprod.json,*CUI.json,*CUI-nonprod.json"
   #for testing ga enhancements please remove *-GAR2GAspec-nonprod.json which are not required for release 1
elif [ ${environment} == demo ]; then
  excludedFilenamePatterns="-e UserProfile.json,*-prod.json,*HNL-nonprod.json,*CUI-nonprod.json,*CUI.json"
elif [ ${environment} == local ]; then
  # upload doesn't currently work with this command due to SDO and SDO-HNL files
  excludedFilenamePatterns="-e *-prod.json"
elif [ ${environment} == aat ]; then
  excludedFilenamePatterns="-e UserProfile.json,*-nonprod.json,*GAspec.json,*CUI.json"
elif [ ${environment} == prod ]; then
  excludedFilenamePatterns="-e UserProfile.json,*-nonprod.json,*GAspec.json,*CUI.json"
elif [ ${environment} == staging ]; then
  excludedFilenamePatterns="-e UserProfile.json,*-nonprod.json,*GAspec.json,*CUI.json"
else
  echo "ERROR! You are passing an environment that is not known by the script!"
  echo "       Either add the new environment to the script or specify a supported environment!"
  exit 1
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
