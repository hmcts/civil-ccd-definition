import { test as requestFactories } from './request-factory-fixtures';
import { test as testUtils } from '../utils/test-utils-fixtures';
import ClaimantDefendantCitizenDataBuilderFactory from '../../data-builders/cui/claimant-defendant-citizen/claimant-defendant-citizen-data-builder-factory';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import CaseworkerDataBuilderFactory from '../../data-builders/exui/caseworker/caseworker-data-builder-factory';
import ClaimantDefendantSolicitorGaDataBuilderFactory from '../../data-builders/ga-exui/claimant-defendant-solicitor/claimant-defendant-solicitor-ga-data-builder-factory';
import CtscAdminDataBuilderFactory from '../../data-builders/exui/ctsc-admin/ctsc-admin-data-builder-factory';
import HearingCenterAdminGaDataBuilderFactory from '../../data-builders/ga-exui/hearing-center-admin/hearing-center-admin-ga-data-builder-factory';
import HearingCenterAdminDataBuilderFactory from '../../data-builders/exui/hearing-center-admin/hearing-center-admin-data-builder-factory';
import JudgeGaDataBuilderFactory from '../../data-builders/ga-exui/judge/judge-ga-data-builder-factory';
import JudgeLADataBuilderFactory from '../../data-builders/exui/judge-la/judge-la-data-builder-factory';
import { mergeTests } from '@playwright/test';
import WireMockStudsDataBuilder from '../../data-builders/wire-mock-studs/wire-mock-studs-data-builder';
import ListedHearingDataBuilder from '../../data-builders/hearings/listed-hearing/unspec/listed-hearing-data-builder';
import ListedHearingSpecDataBuilder from '../../data-builders/hearings/listed-hearing/lr-spec/listed-hearing-spec-data-builder';
import GetPartiesNotifiedResponsesDataBuilder from '../../data-builders/hearings/get-parties-notified-responses/get-parties-notified-responses-data-builder';

type DataBuilderFixtures = {
  _claimantDefendantCitizenDataBuilderFactory: ClaimantDefendantCitizenDataBuilderFactory;
  _claimantDefendantSolicitorDataBuilderFactory: ClaimantDefendantSolicitorDataBuilderFactory;
  _caseworkerDataBuilderFactory: CaseworkerDataBuilderFactory;
  _ctscAdminDataBuilderFactory: CtscAdminDataBuilderFactory;
  _claimantDefendantSolicitorGaDataBuilderFactory: ClaimantDefendantSolicitorGaDataBuilderFactory;
  _hearingCenterAdminGaDataBuilderFactory: HearingCenterAdminGaDataBuilderFactory;
  _hearingCenterAdminDataBuilderFactory: HearingCenterAdminDataBuilderFactory;
  _judgeGaDataBuilderFactory: JudgeGaDataBuilderFactory;
  _judgeDataBuilderFactory: JudgeLADataBuilderFactory;
  _wireMockStudsDataBuilder: WireMockStudsDataBuilder,
  _listedHearingDataBuilder: ListedHearingDataBuilder,
  _listedHearingSpecDataBuilder: ListedHearingSpecDataBuilder,
  _getPartiesNotifiedResponsesDataBuilder: GetPartiesNotifiedResponsesDataBuilder,
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
  _ctscAdminDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new CtscAdminDataBuilderFactory(_requestsFactory, _testData));
  },
  _claimantDefendantSolicitorGaDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new ClaimantDefendantSolicitorGaDataBuilderFactory(_requestsFactory, _testData));
  },
  _hearingCenterAdminGaDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new HearingCenterAdminGaDataBuilderFactory(_requestsFactory, _testData));
  },
  _hearingCenterAdminDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new HearingCenterAdminDataBuilderFactory(_requestsFactory, _testData));
  },
  _judgeGaDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new JudgeGaDataBuilderFactory(_requestsFactory, _testData));
  },
  _judgeDataBuilderFactory: async ({ _requestsFactory, _testData }, use) => {
    await use(new JudgeLADataBuilderFactory(_requestsFactory, _testData));
  },
  _wireMockStudsDataBuilder: async ({ _requestsFactory, _testData }, use) => {
    await use(new WireMockStudsDataBuilder(_requestsFactory, _testData));
  },
  _listedHearingDataBuilder: async ({ _requestsFactory, _testData }, use) => {
    await use(new ListedHearingDataBuilder(_requestsFactory, _testData));
  },
  _listedHearingSpecDataBuilder: async ({ _requestsFactory, _testData }, use) => {
    await use(new ListedHearingSpecDataBuilder(_requestsFactory, _testData));
  },
  _getPartiesNotifiedResponsesDataBuilder: async ({ _requestsFactory, _testData }, use) => {
    await use(new GetPartiesNotifiedResponsesDataBuilder(_requestsFactory, _testData));
  },
});
