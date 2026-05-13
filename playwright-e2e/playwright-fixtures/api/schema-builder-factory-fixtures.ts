import { test as base } from '../utils/test-utils-fixtures';
import ClaimantDefendantSolicitorSchemaBuilderFactory from '../../schema-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-schema-builder-factory';

type DataBuilderFixtures = {
  _claimantDefendantSolicitorSchemaBuilderFactory: ClaimantDefendantSolicitorSchemaBuilderFactory;
};

export const test = base.extend<DataBuilderFixtures>({
  _claimantDefendantSolicitorSchemaBuilderFactory: async ({ _testData }, use) => {
    await use(new ClaimantDefendantSolicitorSchemaBuilderFactory(_testData));
  }
});
