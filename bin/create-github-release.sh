#!/usr/bin/env bash

zip -r civil-damages-ccd-definition.zip ccd-definition
zip -r civil-damages-e2e.zip e2e codecept.conf.js package.json steps.d.ts yarn.lock

currentVersion=$(curl --silent "https://api.github.com/repos/hmcts/civil-damages-ccd-definition/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
IFS='.' read -a versionParts <<< "$currentVersion"
patchVersion=$((versionParts[2] + 1))
nextVersion="${versionParts[0]}.${versionParts[1]}.${patchVersion}"

gh release create ${nextVersion} \
  --title civil-damages-ccd-definition-v${nextVersion} \
  --notes TO-BE-UPDATED-WITH-BUILD-LINK \
  civil-damages-ccd-definition.zip \
  civil-damages-e2e.zip \
  build/ccd-release-config/civil-damages-ccd-definition-aat.xlsx

rm civil-damages-ccd-definition.zip
rm civil-damages-e2e.zip
