import ExuiDashboardSteps from '../../steps/ui/exui/exui-dashboard-steps';
import IdamSteps from '../../steps/ui/idam/idam-steps';
import { test as base } from './page-factory-fixtures';

type UiStepsFixtures = {
  IdamSteps: IdamSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
};

export const test = base.extend<UiStepsFixtures>({
  IdamSteps: async ({ _pageUtilsFactory, _idamPageFactory, _requestsFactory, _testData, _isSetupTest, _isTeardownTest, _verifyCookiesBanner }, use) => {
    await use(new IdamSteps(_pageUtilsFactory, _idamPageFactory, _requestsFactory, _isSetupTest, _isTeardownTest, _verifyCookiesBanner, _testData));
  },
  ExuiDashboardSteps: async ({ _pageUtilsFactory, _exuiDashboardPageFactory, _testData }, use) => {
    await use(new ExuiDashboardSteps(_pageUtilsFactory, _exuiDashboardPageFactory, _testData));
  }
});
