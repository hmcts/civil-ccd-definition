import ExuiDashboardActions from '../actions/ui/exui/common/exui-dashboard-actions';
import GaExuiDashboardActions from '../actions/ui/ga-exui/common/ga-exui-dashboard-actions';
import IdamActions from '../actions/ui/idam/idam-actions';
import TestData from '../models/test-utils/test-data';
import RequestsFactory from '../requests/requests-factory';
import BaseApi from './base-api';
import config from '../config/config';
import ccdEvents from '../constants/ccd-events/ccd-events/ccd-events';
import CCDEvent from '../models/ccd-events/ccdEvent';
import User from '../models/users/user';
import WATask from '../models/wa-task';
import UserAssignedCasesHelper from '../helpers/user-assigned-cases-helper';
import { claimantSolicitorUser } from '../config/users/exui-users';

export default abstract class BaseGaExui extends BaseApi {
  private _gaExuiDashboardActions: GaExuiDashboardActions;
  private _exuiDashboardActions: ExuiDashboardActions;
  private _idamActions: IdamActions;

  constructor(
    gaExuiDashboardActions: GaExuiDashboardActions,
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this._gaExuiDashboardActions = gaExuiDashboardActions;
    this._exuiDashboardActions = exuiDashboardActions;
    this._idamActions = idamActions;
  }

  get exuiDashboardActions() {
    return this._exuiDashboardActions;
  }

  get gaExuiDashboardActions() {
    return this._gaExuiDashboardActions;
  }

  get idamActions() {
    return this._idamActions;
  }

  async retryCCDEvent(
    eventActions: () => Promise<void>,
    confirmActions: () => Promise<void>,
    ccdEvent: CCDEvent,
    { retries = config.exui.eventRetries, verifySuccessEvent = true, camundaProcess = true } = {},
  ) {
    await super.setupBankHolidays();
    await super.setDebugTestData();
    while (retries >= 0) {
      try {
        await this.exuiDashboardActions.startCCDEvent(ccdEvent);

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
      UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
    }
    if (verifySuccessEvent) await this.exuiDashboardActions.verifySuccessEvent(ccdEvent);
    await this.exuiDashboardActions.clearCCDEvent();
    if (camundaProcess) await this.waitForFinishedBusinessProcess(this.ccdCaseData?.id);
    await this.fetchAndSetCCDCaseData(this.ccdCaseData?.id);
  }

  async retryGaCCDEvent(
    eventActions: () => Promise<void>,
    confirmActions: () => Promise<void>,
    ccdEvent: CCDEvent,
    { retries = config.exui.eventRetries, camundaProcess = true } = {},
  ) {
    await super.setupBankHolidays();
    await super.setDebugTestData();
    while (retries >= 0) {
      try {
        await this.gaExuiDashboardActions.startGaCCDEvent(ccdEvent);
        await eventActions();
        break;
      } catch (error) {
        if (retries <= 0) throw error;
        console.log(`GA event: ${ccdEvent.id} failed, trying again (Retries left: ${retries})`);
        retries--;
        await this.gaExuiDashboardActions.clearCCDEvent();
      }
    }
    await confirmActions();
    if (camundaProcess) await this.waitForFinishedBusinessProcess(this.getGaCCDCaseData()?.id);
    await this.fetchAndSetGaCCDCaseData(this.getGaCCDCaseData()?.id);
  }

  async retryWAEvent(
    eventActions: () => Promise<void>,
    confirmActions: () => Promise<void>,
    ccdEvent: CCDEvent,
    user: User,
    validTask: WATask,
    {
      retries = config.exui.eventRetries,
      verifySuccessEvent = true,
      camundaProcess = true,
      startWithWATaskName = false,
    } = {},
  ) {
    await super.setupBankHolidays();
    await super.setDebugTestData();
    const waTask = await super.retrieveAndAssignWATask(user, validTask);
    while (retries >= 0) {
      try {
        if (startWithWATaskName) {
          await this.exuiDashboardActions.startWithWATaskName(ccdEvent, waTask);
        } else {
          await this.exuiDashboardActions.startCCDEvent(ccdEvent);
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
    if (verifySuccessEvent) await this.exuiDashboardActions.verifySuccessEvent(ccdEvent);
    if (camundaProcess) await this.waitForFinishedBusinessProcess(this.ccdCaseData?.id);
    await this.fetchAndSetCCDCaseData(this.ccdCaseData?.id);
    await super.completeWATask(user, waTask.id);
  }

  async retryGAWaEvent(
    eventActions: () => Promise<void>,
    confirmActions: () => Promise<void>,
    ccdEvent: CCDEvent,
    user: User,
    validTask: WATask,
    {
      retries = config.exui.eventRetries,
      camundaProcess = true,
      startWithWATaskName = false,
    } = {},
  ) {
    await super.setupBankHolidays();
    await super.setDebugTestData();
    const waTask = await super.retrieveAndAssignWATask(user, validTask, this.getGaCCDCaseData()?.id);
    while (retries >= 0) {
      try {
        if (startWithWATaskName) {
          await this.gaExuiDashboardActions.startWithGaWaTaskName(ccdEvent, waTask);
        } else {
          await this.gaExuiDashboardActions.startGaCCDEvent(ccdEvent);
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
    if (camundaProcess) await this.waitForFinishedBusinessProcess(this.getGaCCDCaseData()?.id);
    await this.fetchAndSetCCDCaseData(this.getGaCCDCaseData()?.id);
    await super.completeWATask(user, waTask.id);
  }
}
