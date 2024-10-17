echo "Importing CCD definitions"
echo "Loading Environment Variables"
source ./bin/variables/load-dev-user-preview-environment-variables.sh

./bin/build-release-ccd-definition.sh preview
ccdDefinitionFilePath="$(pwd)/build/ccd-release-config/civil-ccd-preview.xlsx"
./bin/utils/ccd-import-definition.sh ${ccdDefinitionFilePath}

echo "Defs loaded for devuser-preview environment."
