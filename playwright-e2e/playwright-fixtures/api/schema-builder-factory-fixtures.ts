import { test as base } from '@playwright/test';
import ClaimantDefendantSolicitorSchemaBuilderFactory from '../../schema-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-schema-builder-factory';

type DataBuilderFixtures = {
  _claimantDefendantSolicitorSchemaBuilderFactory: ClaimantDefendantSolicitorSchemaBuilderFactory;
};

export const test = base.extend<DataBuilderFixtures>({
  _claimantDefendantSolicitorSchemaBuilderFactory: async ({}, use) => {
    await use(new ClaimantDefendantSolicitorSchemaBuilderFactory());
  }
});
