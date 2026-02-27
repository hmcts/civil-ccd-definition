echo "Creating CCD definitions in build/ccd-release-config folder"

set -e
eval $(./bin/variables/load-demo-environment-variables.sh)
./bin/build-release-ccd-definition.sh demo
