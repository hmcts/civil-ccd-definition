import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';
import User from '../../../types/user';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';
import CookiesHelper from '../../../helpers/cookies-helper';
import filePaths from '../../../config/file-paths';
import UserStateHelper from '../../../helpers/users-state-helper';

@AllMethodsStep()
export default class ExuiDashboardSteps extends BaseSteps {
  private pageUtilsFactory: PageUtilsFactory;
  private exuiDashboardFactory: ExuiDashboardFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    exuiDashboardFactory: ExuiDashboardFactory,
    testData: TestData,
  ) {
    super(testData);
    this.pageUtilsFactory = pageUtilsFactory;
    this.exuiDashboardFactory = exuiDashboardFactory;
  }

  async AcceptCookies() {
    const { exuiCookiesBanner } = this.exuiDashboardFactory;
    await exuiCookiesBanner.verifyContent();
    await exuiCookiesBanner.acceptCookies();
  }

  async SaveCookies(user: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;
    const cookies = await pageCookiesManager.getCookies();
    user.cookiesPath = `${filePaths.userCookies}/${user.key}.json`;
    CookiesHelper.writeCookies(cookies, user.cookiesPath);
    UserStateHelper.addUserToState(user);
  }

  async GoToCaseList() {
    const { caseListPage } = this.exuiDashboardFactory;
    await caseListPage.openCaseList();
  }

  async SignOut() {
    const { navBar } = this.exuiDashboardFactory;
    await navBar.clickSignOut();
  }
}
