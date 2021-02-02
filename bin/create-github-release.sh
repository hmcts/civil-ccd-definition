#!/usr/bin/env bash

zip -r civil-damages-ccd-definition.zip ccd-definition

currentVersion=$(curl --silent "https://api.github.com/repos/hmcts/civil-damages-ccd-definition/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
IFS='.' read -a versionParts <<< "$currentVersion"
patchVersion=$((versionParts[2] + 1))
nextVersion="${versionParts[0]}.${versionParts[1]}.${patchVersion}"

gh release create ${nextVersion} \
  --title civil-damages-ccd-definition-v${nextVersion} \
  --notes https://build.platform.hmcts.net/job/HMCTS_Unspec/job/civil-damages-ccd-definition/job/master/3/ \
  civil-damages-ccd-definition.zip \
  build/ccd-release-config/civil-damages-ccd-definition-aat.xlsx

rm civil-damages-ccd-definition.zip
