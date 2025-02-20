import ExuiDashboardActions from '../actions/ui/exui/common/exui-dashboard-actions';
import IdamActions from '../actions/ui/idam/idam-actions';
import ccdEvents from '../constants/ccd-events';
import { Step } from '../decorators/test-steps';
import UserAssignedCasesHelper from '../helpers/user-assigned-cases-helper';
import { CCDEvent } from '../models/ccd/ccd-events';
import TestData from '../models/test-data';
import User from '../models/user';
import RequestsFactory from '../requests/requests-factory';
import BaseApi from './base-api';

const classKey = 'BaseExui';
export default abstract class BaseExui extends BaseApi {
  private _exuiDashboardActions: ExuiDashboardActions;
  private _idamActions: IdamActions;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this._exuiDashboardActions = exuiDashboardActions;
    this._idamActions = idamActions;
  }

  get exuiDashboardActions() {
    return this._exuiDashboardActions;
  }

  get idamActions() {
    return this._idamActions;
  }

  @Step(classKey)
  async retryExuiEvent(
    eventActions: () => Promise<void>,
    confirmActions: () => Promise<void>,
    ccdEvent: CCDEvent,
    user: User,
    { retries = 1, verifySuccessEvent = true, camundaProcess = true } = {},
  ) {
    while (retries >= 0) {
      try {
        if (ccdEvent === ccdEvents.CREATE_CLAIM || ccdEvent === ccdEvents.CREATE_CLAIM_SPEC) {
          await this.exuiDashboardActions.createCase(ccdEvent);
        } else {
          await this.exuiDashboardActions.startExuiEvent(ccdEvent);
        }
        await eventActions();
        break;
      } catch (error) {
        if (retries <= 0) throw error;
        console.log(`Event: ${ccdEvent.id} failed, trying again (Retries left: ${retries})`);
        retries--;
        await this.exuiDashboardActions.clearCCDEvent();
      }
    }
    await confirmActions();
    if (ccdEvent === ccdEvents.CREATE_CLAIM || ccdEvent === ccdEvents.CREATE_CLAIM_SPEC) {
      const caseId = await this.exuiDashboardActions.grabCaseNumber();
      super.setCCDCaseData = { id: caseId };
      UserAssignedCasesHelper.addAssignedCaseToUser(user, this.ccdCaseData.id);
    }
    if (verifySuccessEvent) this.exuiDashboardActions.verifySuccessEvent(ccdEvent);
    await this.exuiDashboardActions.clearCCDEvent();
    if (camundaProcess) await this.waitForFinishedBusinessProcess(user, this.ccdCaseData.id);
    await this.fetchAndSetCCDCaseData(this.ccdCaseData.id);
  }
}
