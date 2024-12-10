import { AllMethodsStep } from '../decorators/test-steps';
import ccdEvents from '../fixtures/ccd-events/events';
import { CCDEvent } from '../models/ccd/ccd-events';
import TestData from '../models/test-data';
import User from '../models/user';
import ExuiDashboardPageFactory from '../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import RequestsFactory from '../requests/requests-factory';
import BaseApiSteps from './base-api-steps';

@AllMethodsStep()
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

  async retryExuiEvent(
    steps: () => Promise<void>,
    ccdEvent: CCDEvent,
    user: User,
    { retries = 3 } = {},
  ) {
    const { caseDetailsPage } = this.exuiDashboardPageFactory;
    while (retries > 0) {
      try {
        if (ccdEvent === ccdEvents.CREATE_CLAIM || ccdEvent === ccdEvents.CREATE_CLAIM_SPEC) {
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
        retries--;
        if (!retries) throw error;
        console.log(`Event: ${ccdEvent.id} failed, trying again (Retries left: ${retries})`);
      }
    }
    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, ccdEvent);
    caseDetailsPage.clearCCDEvent();
    await this.waitForFinishedBusinessProcess(user, this.ccdCaseData.id);
  }
}
