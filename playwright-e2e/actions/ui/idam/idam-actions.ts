import User from '../../../models/users/user';
import config from '../../../config/config';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import BaseApi from '../../../base/base-api';
import RequestsFactory from '../../../requests/requests-factory';
import CookiesHelper from '../../../helpers/cookies-helper';
import IdamPageFactory from '../../../pages/idam/idam-page-factory';
import ExuiDashboardPageFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';

@AllMethodsStep()
export default class IdamActions extends BaseApi {
  private isSetupTest: boolean;
  private isTeardownTest: boolean;
  private pageUtilsFactory: PageUtilsFactory;
  private idamPageFactory: IdamPageFactory;
  private exuiDashboardPageFactory: ExuiDashboardPageFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    idamPageFactory: IdamPageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    isSetupTest: boolean,
    isTeardownTest: boolean,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.isSetupTest = isSetupTest;
    this.isTeardownTest = isTeardownTest;
    this.pageUtilsFactory = pageUtilsFactory;
    this.idamPageFactory = idamPageFactory;
    this.exuiDashboardPageFactory = exuiDashboardPageFactory;
  }

  async exuiLogin(user: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;
    await pageCookiesManager.cookiesSignOut();
    if (!config.runExuiAuthSetup || this.isSetupTest || !(await CookiesHelper.cookiesExist(user))) {
      const { enterEmailPage } = this.idamPageFactory;
      const { enterPasswordPage } = this.idamPageFactory;
      const { caseListPage, myWorkPage } = this.exuiDashboardPageFactory;
      let retries = config.idam.eventRetries;
      let firstAttempt = false;
      while (retries >= 0) {
        try {
          if(!firstAttempt) {
            await pageCookiesManager.addIdamCookies();
            await this.setupUserData(user);
            await pageCookiesManager.addExuiCookies(user);
            await enterEmailPage.openManageCase();
          } else {
            await enterEmailPage.openManageCase();
            try {
              if(user.wa) {
                await myWorkPage.verifyUrlQuick(); 
              } else {
                await caseListPage.verifyUrlQuick();
              }
              break;
              // eslint-disable-next-line no-empty
            } catch(error) {}
          }
          // await loginPage.openManageCase();
          // await loginPage.verifyContent();
          // await loginPage.manageCaseLogin(user);
          await enterEmailPage.openManageCase();
          await enterEmailPage.verifyContent();
          await enterEmailPage.enterEmail(user);
          await enterEmailPage.submit();
          await enterPasswordPage.verifyContent();
          await enterPasswordPage.enterPassword(user);
          await enterPasswordPage.submit(user);
          if(user.wa) {
            await myWorkPage.verifyUrl();
          } else {
            await caseListPage.verifyUrl();
          }
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
