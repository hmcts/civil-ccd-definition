#!/usr/bin/env bash
set -eo pipefail

# User used during the CCD import and ccd-role creation
./bin/utils/ccd-add-role.sh "caseworker-civil"
./bin/utils/ccd-add-role.sh "caseworker-caa"
./bin/utils/ccd-add-role.sh "caseworker-approver"
./bin/utils/ccd-add-role.sh "prd-admin"
./bin/utils/ccd-add-role.sh "judge-profile"
./bin/utils/ccd-add-role.sh "APP-SOL-UNSPEC-PROFILE"
./bin/utils/ccd-add-role.sh "APP-SOL-SPEC-PROFILE"
./bin/utils/ccd-add-role.sh "RES-SOL-ONE-UNSPEC-PROFILE"
./bin/utils/ccd-add-role.sh "RES-SOL-ONE-SPEC-PROFILE"
./bin/utils/ccd-add-role.sh "RES-SOL-TWO-UNSPEC-PROFILE"
./bin/utils/ccd-add-role.sh "RES-SOL-TWO-SPEC-PROFILE"
./bin/utils/ccd-add-role.sh "basic-access" #remove after GS_profile is added
./bin/utils/ccd-add-role.sh "GS_profile"
./bin/utils/ccd-add-role.sh "legal-adviser"
./bin/utils/ccd-add-role.sh "caseworker-ras-validation"
./bin/utils/ccd-add-role.sh "admin-access"
./bin/utils/ccd-add-role.sh "full-access"
./bin/utils/ccd-add-role.sh "civil-administrator-standard"
./bin/utils/ccd-add-role.sh "civil-administrator-basic"
./bin/utils/ccd-add-role.sh "hearing-schedule-access"
./bin/utils/ccd-add-role.sh "payment-access"
./bin/utils/ccd-add-role.sh "caseflags-admin"
./bin/utils/ccd-add-role.sh "caseflags-viewer"
./bin/utils/ccd-add-role.sh "caseworker-wa-task-configuration"
./bin/utils/ccd-add-role.sh "CITIZEN-CLAIMANT-PROFILE"
./bin/utils/ccd-add-role.sh "CITIZEN-DEFENDANT-PROFILE"
./bin/utils/ccd-add-role.sh "cui-admin-profile"

roles=("solicitor" "systemupdate" "admin" "staff")
for role in "${roles[@]}"
do
  ./bin/utils/ccd-add-role.sh "caseworker-civil-${role}"
done
