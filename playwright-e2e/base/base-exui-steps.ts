import { AllMethodsStep } from '../decorators/test-steps';
import ccdEvents from '../constants/ccd-events';
import { CCDEvent } from '../models/ccd/ccd-events';
import TestData from '../models/test-data';
import User from '../models/user';
import ExuiDashboardPageFactory from '../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import RequestsFactory from '../requests/requests-factory';
import BaseApiSteps from './base-api-steps';
import { civilAdminUser } from '../config/users/exui-users';
import UserAssignedCasesHelper from '../helpers/user-assigned-cases-helper';

export default abstract class BaseExuiSteps extends BaseApiSteps {
  private exuiDashboardPageFactory: ExuiDashboardPageFactory;

  constructor(
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.exuiDashboardPageFactory = exuiDashboardPageFactory;
  }

  protected async retryExuiEvent(
    steps: () => Promise<void>,
    ccdEvent: CCDEvent,
    user: User,
    { retries = 1, verifySuccessEvent = true, camundaProcess = true } = {},
  ) {
    const { caseDetailsPage } = this.exuiDashboardPageFactory;
    while (retries >= 0) {
      try {
        if (ccdEvent === ccdEvents.CREATE_CLAIM || ccdEvent === ccdEvents.CREATE_CLAIM_SPEC) {
          const { caseListPage } = this.exuiDashboardPageFactory;
          await caseListPage.openCaseList();
          const { navBar } = this.exuiDashboardPageFactory;
          await navBar.clickCreateCase();
        } else {
          await caseDetailsPage.goToCaseDetails(this.ccdCaseData.id);
          await caseDetailsPage.verifyContent(this.ccdCaseData);
          await caseDetailsPage.retryChooseNextStep(ccdEvent);
        }
        caseDetailsPage.setCCDEvent = ccdEvent;
        await steps();
        break;
      } catch (error) {
        if (retries <= 0) throw error;
        console.log(`Event: ${ccdEvent.id} failed, trying again (Retries left: ${retries})`);
        retries--;
        caseDetailsPage.clearCCDEvent();
      }
    }
    if (ccdEvent === ccdEvents.CREATE_CLAIM || ccdEvent === ccdEvents.CREATE_CLAIM_SPEC) {
      const caseId = await caseDetailsPage.grabCaseNumber();
      super.setCCDCaseData = { id: caseId };
      UserAssignedCasesHelper.addAssignedCaseToUser(user, this.ccdCaseData.id);
    }
    if (verifySuccessEvent) await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, ccdEvent);
    caseDetailsPage.clearCCDEvent();
    if (camundaProcess) await this.waitForFinishedBusinessProcess(user, this.ccdCaseData.id);
    await this.fetchAndSetCCDCaseData(civilAdminUser, this.ccdCaseData.id);
  }
}
