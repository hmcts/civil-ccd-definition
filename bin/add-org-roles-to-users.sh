#!/usr/bin/env bash

# Setting up existing Users with role assignments
echo ""
echo "Setting up Users with role assignments..."
./bin/utils/organisational-role-assignment.sh "civil-admin@mailnesia.com" "Password12!" "PUBLIC" "hmcts-ctsc" '{"jurisdiction":"CIVIL","primaryLocation":"366774"}' "CTSC"
