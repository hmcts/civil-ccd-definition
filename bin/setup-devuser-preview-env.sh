camundaBranch=${1:-master}
dmnBranch=${2:-master}
waStandaloneBranch=${3:-master}

echo "Loading Environment Variables"
source ./bin/variables/load-dev-user-preview-environment-variables.sh
echo "Importing Roles to the CCD pod"
./bin/add-roles.sh
echo "Importing Camunda definitions"
./bin/pull-latest-camunda-files.sh ${camundaBranch}
echo "Importing CCD definitions"
./bin/build-release-ccd-definition.sh preview
ccdDefinitionFilePath="$(realpath $(dirname ${0})/..)/build/ccd-release-config/civil-ccd-preview.xlsx"
./bin/utils/ccd-import-definition.sh ${ccdDefinitionFilePath}

./bin/pull-latest-dmn-files.sh ${dmnBranch}
./bin/pull-latest-camunda-wa-files.sh ${waStandaloneBranch}

echo "ENV variables set for devuser-preview environment."
echo "CDAM_REDIRECT_URL: $CCD_IDAM_REDIRECT_URL"
