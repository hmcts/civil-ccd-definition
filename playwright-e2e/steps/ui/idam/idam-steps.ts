import User from '../../../types/user';
import config from '../../../config/config';
import IdamFactory from '../../../pages/idam/idam-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';
import BaseApiSteps from '../../../base/base-api-steps';
import RequestsFactory from '../../../requests/requests-factory';
import {
  claimantSolicitorUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
} from '../../../config/users/exui-users';

@AllMethodsStep({ methodNamesToIgnore: ['manageCaseLogin'] })
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
    await this.manageCaseLogin(claimantSolicitorUser);
  }

  async DefendantSolicitor1Login() {
    await this.manageCaseLogin(defendantSolicitor1User);
  }

  async DefendantSolicitor2Login() {
    await this.manageCaseLogin(defendantSolicitor2User);
  }

  private async manageCaseLogin(user: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;

    if (config.skipAuthSetup || !user.cookiesPath) {
      const { loginPage } = this.idamFactory;
      await pageCookiesManager.cookiesSignOut();

      if (this.verifyCookiesBanner) {
        const { idamsCookiesBanner } = this.idamFactory;
        await loginPage.openManageCase();
        await idamsCookiesBanner.verifyContent();
        await idamsCookiesBanner.acceptCookies();
      } else {
        await pageCookiesManager.addIdamCookies();
        const { idamRequests } = this.requestsFactory;
        await idamRequests.getUserData(user);
        await pageCookiesManager.addExuiCookies(user);
        await loginPage.openManageCase();
      }
      await loginPage.verifyContent();
      await loginPage.manageCaseLogin(user);
    } else {
      await pageCookiesManager.cookiesSignOut();
      await pageCookiesManager.cookiesLogin(user, this.isTeardown);
    }
  }
}
