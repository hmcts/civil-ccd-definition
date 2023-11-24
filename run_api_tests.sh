#!/bin/bash
cd civil-ccd-definition
for i in $(seq 1 100);
do
  echo "Running $i: test:api-spec" 
  yarn test:api-spec &
  echo "Running $i: test:api-unspec"
  yarn test:api-unspec &
done

wait 
echo "Done!"

