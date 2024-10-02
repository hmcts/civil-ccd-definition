import { test as base } from '../api/api-steps-fixtures';
import PageUtilsFactory from '../../pages/utils/page-utils-factory';

type PageFactoryFixtures = {
  _pageUtilsFactory: PageUtilsFactory;
};

export const test = base.extend<PageFactoryFixtures>({
  _pageUtilsFactory: async ({ page, _axeBuilder }, use) => {
    await use(new PageUtilsFactory(page, _axeBuilder));
  },
});
