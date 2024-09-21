import IdamSteps from '../../steps/ui/idam/idam-steps';
import { test as base } from './page-factory-fixtures';

type UiStepsFixtures = {
  IdamSteps: IdamSteps;
};

export const test = base.extend<UiStepsFixtures>({
  IdamSteps: async ({ _pageUtilsFactory, _idamFactory, _testData, _isSetupTest, _isTeardown, _verifyCookiesBanner }, use) => {
    await use(new IdamSteps(_pageUtilsFactory, _idamFactory, _isSetupTest, _isTeardown, _verifyCookiesBanner, _testData));
  }
});
