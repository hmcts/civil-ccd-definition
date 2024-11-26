import { test as pageFactories } from './page-factory-fixtures';
import { test as requestFactories } from '../api/requests-factory-fixtures';
import { test as testUtils } from '../utils/test-utils-fixtures';
import { mergeTests } from '@playwright/test';
import ExuiDashboardSteps from '../../steps/ui/exui/exui-dashboard-steps';
import ClaimantResponseSpecSteps from '../../steps/ui/exui/solicitor-events/claimant-response/claimant-response-spec-steps';
import ClaimantResponseSteps from '../../steps/ui/exui/solicitor-events/claimant-response/claimant-response-steps';
import CreateClaimSpecSteps from '../../steps/ui/exui/solicitor-events/create-claim/create-claim-spec-steps';
import CreateClaimSteps from '../../steps/ui/exui/solicitor-events/create-claim/create-claim-steps';
import DefendantResponseSpecSteps from '../../steps/ui/exui/solicitor-events/defendant-response/defendant-response-spec-steps';
import DefendantResponseSteps from '../../steps/ui/exui/solicitor-events/defendant-response/defendant-response-steps';
import NotifyClaimDetailsSteps from '../../steps/ui/exui/solicitor-events/notify-claim-details-steps';
import NotifyClaimSteps from '../../steps/ui/exui/solicitor-events/notify-claim-steps';
import IdamSteps from '../../steps/ui/idam/idam-steps';

type UiStepsFixtures = {
  IdamSteps: IdamSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
  CreateClaimSpecSteps: CreateClaimSpecSteps;
  CreateClaimSteps: CreateClaimSteps;
  NotifyClaimSteps: NotifyClaimSteps;
  NotifyClaimDetailsSteps: NotifyClaimDetailsSteps;
  DefendantResponseSpecSteps: DefendantResponseSpecSteps;
  DefendantResponseSteps: DefendantResponseSteps;
  ClaimantResponseSpecSteps: ClaimantResponseSpecSteps;
  ClaimantResponseSteps: ClaimantResponseSteps;
};

export const test = mergeTests(testUtils, pageFactories, requestFactories).extend<UiStepsFixtures>({
  IdamSteps: async ({ _pageUtilsFactory, _idamPageFactory, _requestsFactory, _testData, _isSetupTest, _isTeardownTest, _verifyCookiesBanner }, use) => {
    await use(new IdamSteps(_pageUtilsFactory, _idamPageFactory, _requestsFactory, _isSetupTest, _isTeardownTest, _verifyCookiesBanner, _testData));
  },
  ExuiDashboardSteps: async ({ _pageUtilsFactory, _exuiDashboardPageFactory, _testData }, use) => {
    await use(new ExuiDashboardSteps(_pageUtilsFactory, _exuiDashboardPageFactory, _testData));
  },
  CreateClaimSpecSteps: async ({ _createClaimPageFactory, _testData }, use) => {
    await use(new CreateClaimSpecSteps(_createClaimPageFactory, _testData));
  },
  CreateClaimSteps: async ({ _createClaimPageFactory, _testData }, use) => {
    await use(new CreateClaimSteps(_createClaimPageFactory, _testData));
  },
  NotifyClaimSteps: async ({ _notifyClaimPageFactory, _testData }, use) => {
    await use(new NotifyClaimSteps(_notifyClaimPageFactory, _testData));
  },
  NotifyClaimDetailsSteps: async ({ _notifyClaimDetailsPageFactory, _testData }, use) => {
    await use(new NotifyClaimDetailsSteps(_notifyClaimDetailsPageFactory, _testData));
  },
  DefendantResponseSpecSteps: async ({ _defendantResponsePageFactory, _testData }, use) => {
    await use(new DefendantResponseSpecSteps(_defendantResponsePageFactory, _testData));
  },
  DefendantResponseSteps: async ({ _defendantResponsePageFactory, _testData }, use) => {
    await use(new DefendantResponseSteps(_defendantResponsePageFactory, _testData));
  },
  ClaimantResponseSpecSteps: async ({ _claimantResponsePageFactory, _testData }, use) => {
    await use(new ClaimantResponseSpecSteps(_claimantResponsePageFactory, _testData));
  },
  ClaimantResponseSteps: async ({ _claimantResponsePageFactory, _testData }, use) => {
    await use(new ClaimantResponseSteps(_claimantResponsePageFactory, _testData));
  }
});
