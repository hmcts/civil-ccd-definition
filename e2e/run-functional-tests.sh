#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

export CCD_UI_TESTS=true

if [ "$ENVIRONMENT" = "aat" ]
  yarn test:master-e2e-ft
elif [ -z "$PR_FT_GROUPS" ]
  yarn test:non-prod-e2e-ft
else
  command="yarn test:non-prod-e2e-ft --grep "
  pr_ft_groups=$(echo "$PR_FT_GROUPS" | awk '{print tolower($0)}')
  
  regex_pattern=""

  IFS=',' read -ra ft_groups_array <<< "$pr_ft_groups"

  for ft_group in "${ft_groups_array[@]}"; do
      if [ -n "$regex_pattern" ]; then
          regex_pattern+="|"
      fi
      regex_pattern+="@$ft_group"
  done

  command+="'$regex_pattern'"
  echo "Executing: $command"
  eval "$command"
fi