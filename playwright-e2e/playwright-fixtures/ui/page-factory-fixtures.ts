import { test as base } from '@playwright/test';
import PageUtilsFactory from '../../pages/utils/page-utils-factory';
import IdamPageFactory from '../../pages/idam/idam-page-factory';
import ExuiDashboardPageFactory from '../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import CreateClaimPageFactory from '../../pages/exui/solicitor-events/create-claim/create-claim-page-factory';
import NotifyClaimPageFactory from '../../pages/exui/solicitor-events/notify-claim/notify-claim-page-factory';
import NotifyClaimDetailsPageFactory from '../../pages/exui/solicitor-events/notify-claim-details/notify-claim-details-page-factory';
import DefendantResponsePageFactory from '../../pages/exui/solicitor-events/response/defendant-response/defendant-response-page-factory';
import ClaimantResponsePageFactory from '../../pages/exui/solicitor-events/response/claimant-response/claimant-response-page-factory';
import InformAgreedExtensionDatePageFactory from '../../pages/exui/solicitor-events/inform-agreed-extension-date/inform-agreed-extension-date-page-factory';
import CreateCaseFlagsPageFactory from '../../pages/exui/caseworker-events/create-case-flags/create-case-flags-page-factory';
import AddDefendantLitigationFriendPageFactory from '../../pages/exui/solicitor-events/add-defendant-litigation-friend/add-defendant-litigation-friend-page-factory';

type PageFactoryFixtures = {
  _pageUtilsFactory: PageUtilsFactory;
  _idamPageFactory: IdamPageFactory;
  _exuiDashboardPageFactory: ExuiDashboardPageFactory;
  _createClaimPageFactory: CreateClaimPageFactory;
  _notifyClaimPageFactory: NotifyClaimPageFactory;
  _notifyClaimDetailsPageFactory: NotifyClaimDetailsPageFactory;
  _informAgreedExtensionDateFactory: InformAgreedExtensionDatePageFactory;
  _defendantResponsePageFactory: DefendantResponsePageFactory;
  _claimantResponsePageFactory: ClaimantResponsePageFactory;
  _createCaseFlagsPageFactory: CreateCaseFlagsPageFactory;
  _addDefendantLitigationFriendPageFactory: AddDefendantLitigationFriendPageFactory;
};

export const test = base.extend<PageFactoryFixtures>({
  _pageUtilsFactory: async ({ page }, use) => {
    await use(new PageUtilsFactory(page));
  },
  _idamPageFactory: async ({ page }, use) => {
    await use(new IdamPageFactory(page));
  },
  _exuiDashboardPageFactory: async ({ page }, use) => {
    await use(new ExuiDashboardPageFactory(page));
  },
  _createClaimPageFactory: async ({ page }, use) => {
    await use(new CreateClaimPageFactory(page));
  },
  _notifyClaimPageFactory: async ({ page }, use) => {
    await use(new NotifyClaimPageFactory(page));
  },
  _notifyClaimDetailsPageFactory: async ({ page }, use) => {
    await use(new NotifyClaimDetailsPageFactory(page));
  },
  _informAgreedExtensionDateFactory: async ({ page }, use) => {
    await use(new InformAgreedExtensionDatePageFactory(page));
  },
  _defendantResponsePageFactory: async ({ page }, use) => {
    await use(new DefendantResponsePageFactory(page));
  },
  _claimantResponsePageFactory: async ({ page }, use) => {
    await use(new ClaimantResponsePageFactory(page));
  },
  _createCaseFlagsPageFactory: async ({ page }, use) => {
    await use(new CreateCaseFlagsPageFactory(page));
  },
  _addDefendantLitigationFriendPageFactory: async ({ page }, use) => {
    await use(new AddDefendantLitigationFriendPageFactory(page));
  }
});
