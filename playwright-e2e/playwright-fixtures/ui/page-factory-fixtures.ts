import { test as base } from '../api/api-steps-fixtures';
import PageUtilsFactory from '../../pages/utils/page-utils-factory';
import IdamPageFactory from '../../pages/idam/idam-page-factory';
import ExuiDashboardPageFactory from '../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import CreateClaimPageFactory from '../../pages/exui/solicitor-events/create-claim/create-claim-page-factory';

type PageFactoryFixtures = {
  _pageUtilsFactory: PageUtilsFactory;
  _idamPageFactory: IdamPageFactory;
  _exuiDashboardPageFactory: ExuiDashboardPageFactory;
  _createClaimPageFactory: CreateClaimPageFactory;
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
  }
});
