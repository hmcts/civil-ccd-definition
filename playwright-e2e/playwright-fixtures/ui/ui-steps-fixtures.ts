import ExuiDashboardSteps from '../../steps/ui/exui/exui-dashboard-steps';
import IdamSteps from '../../steps/ui/idam/idam-steps';
import { test as base } from './page-factory-fixtures';

type UiStepsFixtures = {
  IdamSteps: IdamSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
};

export const test = base.extend<UiStepsFixtures>({
  IdamSteps: async ({ _pageUtilsFactory, _idamPageFactory, _requestsFactory, _testData, _isTeardown, _verifyCookiesBanner }, use) => {
    await use(new IdamSteps(_pageUtilsFactory, _idamPageFactory, _requestsFactory, _isTeardown, _verifyCookiesBanner, _testData));
  }
});
