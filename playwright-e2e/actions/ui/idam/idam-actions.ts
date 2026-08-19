import User from '../../../models/users/user';
import config from '../../../config/config';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import BaseApi from '../../../base/base-api';
import RequestsFactory from '../../../requests/requests-factory';
import CookiesHelper from '../../../helpers/cookies-helper';
import IdamPageFactory from '../../../pages/idam/idam-page-factory';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';

@AllMethodsStep()
export default class IdamActions extends BaseApi {
  private isSetupTest: boolean;
  private isTeardownTest: boolean;
  private verifyCookiesBanner: boolean;
  private pageUtilsFactory: PageUtilsFactory;
  private idamPageFactory: IdamPageFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    idamPageFactory: IdamPageFactory,
    requestsFactory: RequestsFactory,
    isSetupTest: boolean,
    isTeardownTest: boolean,
    verifyCookiesBanner: boolean,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.isSetupTest = isSetupTest;
    this.isTeardownTest = isTeardownTest;
    this.verifyCookiesBanner = verifyCookiesBanner;
    this.pageUtilsFactory = pageUtilsFactory;
    this.idamPageFactory = idamPageFactory;
  }

  async exuiLogin(user: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;
    await pageCookiesManager.cookiesSignOut();
    if (!config.runExuiAuthSetup || this.isSetupTest || !(await CookiesHelper.cookiesExist(user))) {
      const { enterEmailPage } = this.idamPageFactory;
      const { enterPasswordPage } = this.idamPageFactory;
      let retries = config.idam.eventRetries;
      let firstAttempt = false;
      while (retries >= 0) {
        try {
          if(!firstAttempt) {
            if (this.verifyCookiesBanner) {
              const { idamsCookiesBanner } = this.idamPageFactory;
              // await loginPage.openManageCase();
              await enterEmailPage.openManageCase();
              await idamsCookiesBanner.verifyContent();
              await idamsCookiesBanner.acceptCookies();
            } else {
              await pageCookiesManager.addIdamCookies();
              await this.setupUserData(user);
              await pageCookiesManager.addExuiCookies(user);
              // await loginPage.openManageCase();
              await enterEmailPage.openManageCase();
            }
          } else {
            await enterEmailPage.openManageCase();
          }
          // await loginPage.verifyContent();
          // await loginPage.manageCaseLogin(user);
          await enterEmailPage.verifyContent();
          await enterEmailPage.enterEmail(user);
          await enterEmailPage.submit();
          await enterPasswordPage.verifyContent();
          await enterPasswordPage.enterPassword(user);
          await enterPasswordPage.submit(user);
          break;
        } catch(error) {
          if (retries <= 0) throw error;
          console.log(`Login user: ${user.name}, email: ${user.email}, failed, trying again (Retries left: ${retries})`);
          retries--;
          firstAttempt = true
        }
      }
    } else {
      const cookies = await CookiesHelper.getCookies(user, this.isTeardownTest);
      await pageCookiesManager.cookiesLogin(user, cookies);
    }
  }
}
