import BaseSteps from '../../../base/base-steps';
import User from '../../../types/user';
import config from '../../../config/config';
import IdamFactory from '../../../pages/idam/idam-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';

@AllMethodsStep({ methodNamesToIgnore: ['exuiLogin', 'citizenLogin'] })
export default class IdamSteps extends BaseSteps {
  private isSetupTest: boolean;
  private isTeardown: boolean;
  private verifyCookiesBanner: boolean;
  private pageUtilsFactory: PageUtilsFactory;
  private idamFactory: IdamFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    idamFactory: IdamFactory,
    isSetupTest: boolean,
    isTeardownTest: boolean,
    verifyCookiesBanner: boolean,
    testData: TestData,
  ) {
    super(testData);
    this.isSetupTest = isSetupTest;
    this.isTeardown = isTeardownTest;
    this.verifyCookiesBanner = verifyCookiesBanner;
    this.pageUtilsFactory = pageUtilsFactory;
    this.idamFactory = idamFactory;
  }

  private async exuiLogin(user: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;

    if (config.skipAuthSetup || this.isSetupTest) {
      const { loginPage } = this.idamFactory;
      await pageCookiesManager.cookiesSignOut();

      if (this.isSetupTest && this.verifyCookiesBanner) {
        const { idamsCookiesBanner } = this.idamFactory;
        await loginPage.openManageCase();
        await idamsCookiesBanner.verifyContent();
        await idamsCookiesBanner.acceptCookies();
      } else {
        await pageCookiesManager.addIdamCookies();
        await pageCookiesManager.addExuiCookies(user);
        await loginPage.openManageCase();
      }

      await loginPage.verifyContent();
      await loginPage.caseworkerLogin(user);
    } else {
      await pageCookiesManager.cookiesLogin(user, this.isTeardown);
    }
  }
}
