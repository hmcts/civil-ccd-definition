import ExuiDashboardPageFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import User from '../../../models/user';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';
import CookiesHelper from '../../../helpers/cookies-helper';

@AllMethodsStep()
export default class ExuiDashboardSteps extends BaseSteps {
  private pageUtilsFactory: PageUtilsFactory;
  private exuiDashboardPageFactory: ExuiDashboardPageFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    testData: TestData,
  ) {
    super(testData);
    this.pageUtilsFactory = pageUtilsFactory;
    this.exuiDashboardPageFactory = exuiDashboardPageFactory;
  }

  async AcceptCookies() {
    const { exuiCookiesBanner } = this.exuiDashboardPageFactory;
    await exuiCookiesBanner.verifyContent();
    await exuiCookiesBanner.acceptCookies();
  }

  async SaveCookies(user: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;
    const cookies = await pageCookiesManager.getCookies();
    CookiesHelper.writeCookies(cookies, user);
  }

  async GoToCaseList() {
    const { caseListPage } = this.exuiDashboardPageFactory;
    await caseListPage.openCaseList();
  }

  async SignOut() {
    const { navBar } = this.exuiDashboardPageFactory;
    await navBar.clickSignOut();
  }
}
