import { test as base } from '@playwright/test';
import CreateClaimDataBuilder from '../../data-builders/ccd-events/exui/solicitor-events/create-claim/unspec/create-claim-data-builder';
import CreateClaimSpecDataBuilder from '../../data-builders/ccd-events/exui/solicitor-events/create-claim/lr-spec/create-claim-spec-data-builder';
import ServiceRequestDataBuilder from '../../data-builders/service-request/service-request-data-builder';

type DataBuilderFixtures = {
  _createClaimDataBuilder: CreateClaimDataBuilder;
  _createClaimSpecDataBuilder: CreateClaimSpecDataBuilder;
  _serviceRequestDataBuilder: ServiceRequestDataBuilder;
};

export const test = base.extend<DataBuilderFixtures>({
  _createClaimDataBuilder: async ({}, use) => {
    await use(new CreateClaimDataBuilder());
  },
  _createClaimSpecDataBuilder: async ({}, use) => {
    await use(new CreateClaimSpecDataBuilder());
  },
  _serviceRequestDataBuilder: async ({}, use) => {
    await use(new ServiceRequestDataBuilder());
  }
});
