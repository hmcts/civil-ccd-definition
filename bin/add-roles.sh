#!/usr/bin/env bash

# User used during the CCD import and ccd-role creation
${root_dir}/bin/utils/ccd-add-role.sh "caseworker-civil"
${root_dir}/bin/utils/ccd-add-role.sh "caseworker-caa"
${root_dir}/bin/utils/ccd-add-role.sh "caseworker-approver"
${root_dir}/bin/utils/ccd-add-role.sh "prd-admin"

roles=("solicitor" "systemupdate" "admin" "staff")
for role in "${roles[@]}"
do
  ${root_dir}/bin/utils/ccd-add-role.sh "caseworker-civil-${role}"
done
