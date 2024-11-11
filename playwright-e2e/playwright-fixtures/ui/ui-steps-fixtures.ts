import ExuiDashboardSteps from '../../steps/ui/exui/exui-dashboard-steps';
import ClaimantResponseSpecSteps from '../../steps/ui/exui/solicitor-events/claimant-response/claimant-response-spec-steps';
import ClaimantResponseUnspecSteps from '../../steps/ui/exui/solicitor-events/claimant-response/claimant-response-unspec-steps';
import CreateClaimSpecSteps from '../../steps/ui/exui/solicitor-events/create-claim/create-claim-spec-steps';
import CreateClaimUnspecSteps from '../../steps/ui/exui/solicitor-events/create-claim/create-claim-unspec-steps';
import DefendantResponseSpecSteps from '../../steps/ui/exui/solicitor-events/defendant-response/defendant-response-spec-steps';
import DefendantResponseUnspecSteps from '../../steps/ui/exui/solicitor-events/defendant-response/defendant-response-unspec-steps';
import NotifyClaimDetailsSteps from '../../steps/ui/exui/solicitor-events/notify-claim-details-steps';
import NotifyClaimSteps from '../../steps/ui/exui/solicitor-events/notify-claim-steps';
import IdamSteps from '../../steps/ui/idam/idam-steps';
import { test as base } from './page-factory-fixtures';

type UiStepsFixtures = {
  IdamSteps: IdamSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
  CreateClaimSpecSteps: CreateClaimSpecSteps;
  CreateClaimUnspecSteps: CreateClaimUnspecSteps;
  NotifyClaimSteps: NotifyClaimSteps;
  NotifyClaimDetailsSteps: NotifyClaimDetailsSteps;
  DefendantResponseSpecSteps: DefendantResponseSpecSteps;
  DefendantResponseUnspecSteps: DefendantResponseUnspecSteps;
  ClaimantResponseSpecSteps: ClaimantResponseSpecSteps;
  ClaimantResponseUnspecSteps: ClaimantResponseUnspecSteps;
};

export const test = base.extend<UiStepsFixtures>({
  IdamSteps: async ({ _pageUtilsFactory, _idamPageFactory, _requestsFactory, _testData, _isSetupTest, _isTeardownTest, _verifyCookiesBanner }, use) => {
    await use(new IdamSteps(_pageUtilsFactory, _idamPageFactory, _requestsFactory, _isSetupTest, _isTeardownTest, _verifyCookiesBanner, _testData));
  },
  ExuiDashboardSteps: async ({ _pageUtilsFactory, _exuiDashboardPageFactory, _testData }, use) => {
    await use(new ExuiDashboardSteps(_pageUtilsFactory, _exuiDashboardPageFactory, _testData));
  },
  CreateClaimSpecSteps: async ({ _createClaimPageFactory, _testData }, use) => {
    await use(new CreateClaimSpecSteps(_createClaimPageFactory, _testData));
  },
  CreateClaimUnspecSteps: async ({ _createClaimPageFactory, _testData }, use) => {
    await use(new CreateClaimUnspecSteps(_createClaimPageFactory, _testData));
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
  DefendantResponseUnspecSteps: async ({ _defendantResponsePageFactory, _testData }, use) => {
    await use(new DefendantResponseUnspecSteps(_defendantResponsePageFactory, _testData));
  },
  ClaimantResponseSpecSteps: async ({ _claimantResponsePageFactory, _testData }, use) => {
    await use(new ClaimantResponseSpecSteps(_claimantResponsePageFactory, _testData));
  },
  ClaimantResponseUnspecSteps: async ({ _claimantResponsePageFactory, _testData }, use) => {
    await use(new ClaimantResponseUnspecSteps(_claimantResponsePageFactory, _testData));
  }
});
