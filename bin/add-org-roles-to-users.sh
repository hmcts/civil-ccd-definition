#!/usr/bin/env bash

# Setup Users
echo ""
echo "Setting up WA Users and role assignments..."
./bin/utils/organisational-role-assignment.sh "ctsc_admin@justice.gov.uk" "${DEFAULT_PASSWORD}" "PUBLIC" "hmcts-ctsc" '{"jurisdiction":"CIVIL","primaryLocation":"366774"}' "CTSC"
./bin/utils/organisational-role-assignment.sh "ctsc_admin@justice.gov.uk" "${DEFAULT_PASSWORD}" "PUBLIC" "hearing-viewer" '{"jurisdiction":"CIVIL","primaryLocation":"366774"}' "CTSC"
./bin/utils/organisational-role-assignment.sh "ctsc_admin@justice.gov.uk" "${DEFAULT_PASSWORD}" "PUBLIC" "ctsc" '{"jurisdiction":"CIVIL","primaryLocation":"366774","workTypes":"routine_work"}' "CTSC"


#./bin/utils/organisational-role-assignment.sh "${IA_WA_CASEOFFICER_USERNAME}" "${IA_WA_CASEOFFICER_PASSWORD}" "PUBLIC" "task-supervisor" '{"jurisdiction":"IA","primaryLocation":"765324"}' "LEGAL_OPERATIONS"
