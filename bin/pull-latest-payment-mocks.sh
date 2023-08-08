#!/usr/bin/env bash

set -e

#Create wiremock mappings folder
rm -rf ./wiremock-mappings
mkdir wiremock-mappings
cd wiremock-mappings
mkdir __files
mkdir mappings
cd ..
#Checkout civil-sdk
git clone https://github.com/hmcts/civil-sdk.git
cd civil-sdk/mocks/wiremock

#Copy mocks to civil-ccd-def
cp -r ./__files/payment ../../../wiremock-mappings/__files/payment
cp -r ./__files/payments-waystopay ../../../wiremock-mappings/__files/payments-waystopay
cp -r ./mappings/payments ../../../wiremock-mappings/mappings/payments
cp -r ./mappings/payments-waystopay ../../../wiremock-mappings/mappings/payments-waystopay
cd ../../../ #back to bin
rm -rf ./civil-sdk

docker-compose -f compose-mock.yml up -d

sleep 5

echo "Wiremock started"
