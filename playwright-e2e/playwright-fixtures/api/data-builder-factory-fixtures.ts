import { test as base } from '@playwright/test';
import CreateClaimSpecDataBuilder from '../../data-builders/exui/claimant-solicitor/create-claim/lr-spec/create-claim-spec-data-builder';
import CreateClaimDataBuilder from '../../data-builders/exui/claimant-solicitor/create-claim/unspec/create-claim-data-builder';
import ServiceRequestDataBuilder from '../../data-builders/exui/claimant-solicitor/service-request/service-request-data-builder';
import ClaimantSolicitorDataBuilderFactory from '../../data-builders/exui/claimant-solicitor/claimant-solicitor-data-builder-factory';

type DataBuilderFixtures = {
  _claimantSolicitorDataBuilderFactory: ClaimantSolicitorDataBuilderFactory;
};

export const test = base.extend<DataBuilderFixtures>({
  _claimantSolicitorDataBuilderFactory: async ({}, use) => {
    await use(new ClaimantSolicitorDataBuilderFactory());
  }
});
