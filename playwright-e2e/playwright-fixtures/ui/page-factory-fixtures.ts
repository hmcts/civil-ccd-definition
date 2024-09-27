import { test as base } from '../api/api-steps-fixtures';
import PageUtilsFactory from '../../pages/utils/page-utils-factory';
import IdamPageFactory from '../../pages/idam/idam-page-factory';
import ExuiDashboardPageFactory from '../../pages/exui/exui-dashboard/exui-dashboard-page-factory';

type PageFactoryFixtures = {
  _pageUtilsFactory: PageUtilsFactory;
  _idamPageFactory: IdamPageFactory;
  _exuiDashboardPageFactory: ExuiDashboardPageFactory;
};

export const test = base.extend<PageFactoryFixtures>({
  _pageUtilsFactory: async ({ page, _axeBuilder }, use) => {
    await use(new PageUtilsFactory(page, _axeBuilder));
  },
  _idamPageFactory: async ({ page, _axeBuilder }, use) => {
    await use(new IdamPageFactory(page, _axeBuilder));
  },
  _exuiDashboardPageFactory: async ({ page, _axeBuilder }, use) => {
    await use(new ExuiDashboardPageFactory(page, _axeBuilder));
  }
});
