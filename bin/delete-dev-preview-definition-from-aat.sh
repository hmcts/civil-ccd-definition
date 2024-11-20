#!/usr/bin/env bash

echo "Removing dev-preview definitions from AAT"
curl -v -k -X DELETE \
  "http://ccd-definition-store-api-aat.service.core-compute-aat.internal/api/testing-support/cleanup-case-type/1/?caseTypeIds=CIVIL$(whoami)"
