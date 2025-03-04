import BaseApi from '../../../../base/base-api';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CookiesHelper from '../../../../helpers/cookies-helper';
import { CCDEvent } from '../../../../models/ccd/ccd-events';
import TestData from '../../../../models/test-data';
import User from '../../../../models/user';
import ExuiDashboardPageFactory from '../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import PageUtilsFactory from '../../../../pages/utils/page-utils-factory';
import RequestsFactory from '../../../../requests/requests-factory';

@AllMethodsStep({ methodNamesToIgnore: ['clearCCDEvent'] })
export default class ExuiDashboardActions extends BaseApi {
  private pageUtilsFactory: PageUtilsFactory;
  private exuiDashboardPageFactory: ExuiDashboardPageFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.pageUtilsFactory = pageUtilsFactory;
    this.exuiDashboardPageFactory = exuiDashboardPageFactory;
  }

  async acceptCookies() {
    const { exuiCookiesBanner } = this.exuiDashboardPageFactory;
    await exuiCookiesBanner.verifyContent();
    await exuiCookiesBanner.acceptCookies();
  }

  async saveCookies(user: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;
    const cookies = await pageCookiesManager.getCookies();
    CookiesHelper.writeCookies(cookies, user);
  }

  async goToCaseList() {
    const { caseListPage } = this.exuiDashboardPageFactory;
    await caseListPage.openCaseList();
  }

  async goToCaseDetails() {
    const { caseDetailsPage } = this.exuiDashboardPageFactory;
    await caseDetailsPage.goToCaseDetails(this.ccdCaseData.id);
    await caseDetailsPage.verifyContent(this.ccdCaseData);
  }

  async signOut() {
    const { navBar } = this.exuiDashboardPageFactory;
    await navBar.clickSignOut();
  }

  async createCase(ccdEvent: CCDEvent) {
    const { caseListPage } = this.exuiDashboardPageFactory;
    await caseListPage.openCaseList();
    const { navBar } = this.exuiDashboardPageFactory;
    await navBar.clickCreateCase();
    const { caseDetailsPage } = this.exuiDashboardPageFactory;
    caseDetailsPage.setCCDEvent = ccdEvent;
  }

  async startExuiEvent(ccdEvent: CCDEvent) {
    const { caseDetailsPage } = this.exuiDashboardPageFactory;
    await caseDetailsPage.goToCaseDetails(this.ccdCaseData.id);
    await caseDetailsPage.verifyContent(this.ccdCaseData);
    await caseDetailsPage.retryChooseNextStep(ccdEvent);
    caseDetailsPage.setCCDEvent = ccdEvent;
  }

  async clearCCDEvent() {
    const { caseDetailsPage } = this.exuiDashboardPageFactory;
    caseDetailsPage.clearCCDEvent();
  }

  async grabCaseNumber() {
    const { caseDetailsPage } = this.exuiDashboardPageFactory;
    return await caseDetailsPage.grabCaseNumber();
  }

  async verifySuccessEvent(ccdEvent: CCDEvent) {
    const { caseDetailsPage } = this.exuiDashboardPageFactory;
    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, ccdEvent);
  }
}
