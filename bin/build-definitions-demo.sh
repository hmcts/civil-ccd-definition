echo "Creating CCD definitions in build/ccd-release-config folder"

set -e
./bin/refuse-once-civil-service-owns-definitions.sh build-definitions-demo.sh
eval $(./bin/variables/load-demo-environment-variables.sh)
./bin/build-release-ccd-definition.sh demo
