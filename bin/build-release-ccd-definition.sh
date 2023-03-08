set -eu

environment=${1:-prod}

# if any exclusions are updated here, please also update the exclusions map in e2e/tests/unit/utils/dataProvider.js
if [ ${environment} == preview ]; then
	@@ -16,17 +18,27 @@ elif [ ${environment} == local ]; then
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
