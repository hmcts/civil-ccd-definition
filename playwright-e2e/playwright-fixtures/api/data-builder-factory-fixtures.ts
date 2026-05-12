import { test as requestFactories } from './request-factory-fixtures';
import { test as testUtils } from '../utils/test-utils-fixtures';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import { mergeTests } from '@playwright/test';

type DataBuilderFixtures = {
  _claimantDefendantSolicitorDataBuilderFactory: ClaimantDefendantSolicitorDataBuilderFactory;
};

export const test = mergeTests(testUtils, requestFactories).extend<DataBuilderFixtures>({
  _claimantDefendantSolicitorDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new ClaimantDefendantSolicitorDataBuilderFactory(_requestsFactory, _testData));
  }
});
