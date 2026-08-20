import { test as requestFactories } from './request-factory-fixtures';
import { test as testUtils } from '../utils/test-utils-fixtures';
import ClaimantDefendantCitizenDataBuilderFactory from '../../data-builders/cui/claimant-defendant-citizen/claimant-defendant-citizen-data-builder-factory';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import CaseworkerDataBuilderFactory from '../../data-builders/exui/caseworker/caseworker-data-builder-factory';
import GaExuiDataBuilderFactory from '../../data-builders/ga-exui/ga-exui-data-builder-factory';
import HearingCenterAdminDataBuilderFactory from '../../data-builders/exui/hearing-center-admin/hearing-center-admin-data-builder-factory';
import JudgeLADataBuilderFactory from '../../data-builders/exui/judge-la/judge-la-data-builder-factory';
import { mergeTests } from '@playwright/test';

type DataBuilderFixtures = {
  _claimantDefendantCitizenDataBuilderFactory: ClaimantDefendantCitizenDataBuilderFactory;
  _claimantDefendantSolicitorDataBuilderFactory: ClaimantDefendantSolicitorDataBuilderFactory;
  _caseworkerDataBuilderFactory: CaseworkerDataBuilderFactory;
  _gaExuiDataBuilderFactory: GaExuiDataBuilderFactory;
  _hearingCenterAdminDataBuilderFactory: HearingCenterAdminDataBuilderFactory;
  _judgeDataBuilderFactory: JudgeLADataBuilderFactory;
};

export const test = mergeTests(testUtils, requestFactories).extend<DataBuilderFixtures>({
  _claimantDefendantCitizenDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new ClaimantDefendantCitizenDataBuilderFactory(_requestsFactory, _testData));
  },
  _claimantDefendantSolicitorDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new ClaimantDefendantSolicitorDataBuilderFactory(_requestsFactory, _testData));
  },
  _caseworkerDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new CaseworkerDataBuilderFactory(_requestsFactory, _testData));
  },
  _gaExuiDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new GaExuiDataBuilderFactory(_requestsFactory, _testData));
  },
  _hearingCenterAdminDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new HearingCenterAdminDataBuilderFactory(_requestsFactory, _testData));
  },
  _judgeDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new JudgeLADataBuilderFactory(_requestsFactory, _testData));
  },
});
