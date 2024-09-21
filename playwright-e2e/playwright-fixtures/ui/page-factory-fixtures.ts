import { test as base } from '../api/api-steps-fixtures';
import PageUtilsFactory from '../../pages/utils/page-utils-factory';
import IdamFactory from '../../pages/idam/idam-factory';

type PageFactoryFixtures = {
  _pageUtilsFactory: PageUtilsFactory;
  _idamFactory: IdamFactory;
};

export const test = base.extend<PageFactoryFixtures>({
  _pageUtilsFactory: async ({ page, _axeBuilder }, use) => {
    await use(new PageUtilsFactory(page, _axeBuilder));
  },
  _idamFactory: async ({ page, _axeBuilder }, use) => {
    await use(new IdamFactory(page, _axeBuilder));
  }
});
