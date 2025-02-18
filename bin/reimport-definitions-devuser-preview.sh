camundaBranch=${1:-master}
dmnBranch=${2:-master}
waStandaloneBranch=${3:-master}

echo "Loading Environment Variables"
source ./bin/variables/load-dev-user-preview-environment-variables.sh
echo "Importing CCD definitions"
./bin/build-release-ccd-definition.sh preview
ccdDefinitionFilePath="$(pwd)/build/ccd-release-config/civil-ccd-preview.xlsx"
./bin/utils/ccd-import-definition.sh ${ccdDefinitionFilePath}
rm -rf $(pwd)/build/ccd-release-config

echo "ENV variables set for devuser-preview environment."
echo "XUI_URL: $XUI_WEBAPP_URL"
