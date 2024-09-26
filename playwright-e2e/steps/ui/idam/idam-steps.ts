import User from '../../../types/user';
import config from '../../../config/config';
import IdamFactory from '../../../pages/idam/idam-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';
import BaseApiSteps from '../../../base/base-api-steps';
import RequestsFactory from '../../../requests/requests-factory';
import exuiUsers from '../../../config/users/exui-users';
import CookiesHelper from '../../../helpers/cookies-helper';

@AllMethodsStep({ methodNamesToIgnore: ['exuiLogin'] })
export default class IdamSteps extends BaseApiSteps {
  private isTeardown: boolean;
  private verifyCookiesBanner: boolean;
  private pageUtilsFactory: PageUtilsFactory;
  private idamFactory: IdamFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    idamFactory: IdamFactory,
    requestsFactory: RequestsFactory,
    isTeardownTest: boolean,
    verifyCookiesBanner: boolean,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.isTeardown = isTeardownTest;
    this.verifyCookiesBanner = verifyCookiesBanner;
    this.pageUtilsFactory = pageUtilsFactory;
    this.idamFactory = idamFactory;
  }

  async ClaimantSolicitorLogin() {
    await this.exuiLogin(exuiUsers.claimantSolicitorUser);
  }

  async DefendantSolicitor1Login() {
    await this.exuiLogin(exuiUsers.defendantSolicitor1User);
  }

  async DefendantSolicitor2Login() {
    await this.exuiLogin(exuiUsers.defendantSolicitor2User);
  }

  private async exuiLogin(user: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;
    await pageCookiesManager.cookiesSignOut();

    if (config.skipAuthSetup || !user.cookiesPath) {
      const { loginPage } = this.idamFactory;

      if (this.verifyCookiesBanner) {
        const { idamsCookiesBanner } = this.idamFactory;
        await loginPage.openManageCase();
        await idamsCookiesBanner.verifyContent();
        await idamsCookiesBanner.acceptCookies();
      } else {
        await pageCookiesManager.addIdamCookies();
        await this.setupUserData(user);
        await pageCookiesManager.addExuiCookies(user);
        await loginPage.openManageCase();
      }
      await loginPage.verifyContent();
      await loginPage.manageCaseLogin(user);
    } else {
      const cookies = await CookiesHelper.getCookies(user.cookiesPath, this.isTeardown);
      await pageCookiesManager.cookiesLogin(user, cookies);
    }
  }
}
