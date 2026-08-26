import GaExuiDashboardActions from '../actions/ui/ga-exui/common/ga-exui-dashboard-actions';
import IdamActions from '../actions/ui/idam/idam-actions';
import TestData from '../models/test-utils/test-data';
import RequestsFactory from '../requests/requests-factory';
import BaseApi from './base-api';
import config from '../config/config';
import CCDEvent from '../models/ccd-events/ccdEvent';
import User from '../models/users/user';
import WATask from '../models/wa-task';
import GaCaseState from '../constants/cases/ga-case-states';

export default abstract class BaseGaExui extends BaseApi {
  private _gaExuiDashboardActions: GaExuiDashboardActions;
  private _idamActions: IdamActions;

  constructor(
    gaExuiDashboardActions: GaExuiDashboardActions,
    idamActions: IdamActions,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this._gaExuiDashboardActions = gaExuiDashboardActions;
    this._idamActions = idamActions;
  }

  get gaExuiDashboardActions() {
    return this._gaExuiDashboardActions;
  }

  get idamActions() {
    return this._idamActions;
  }

  async retryGaCCDEvent(
    eventActions: () => Promise<void>,
    confirmActions: () => Promise<void>,
    ccdEvent: CCDEvent,
    { 
      retries = config.exui.eventRetries, 
      verifySuccessEvent = true, 
      camundaProcess = true,
      expectedState
    }: {
      retries?: number,
      verifySuccessEvent?: boolean,
      camundaProcess?: boolean,
      expectedState?: GaCaseState | GaCaseState[]
    } = {},
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
    if (verifySuccessEvent) await this.gaExuiDashboardActions.verifySuccessEvent(ccdEvent);
    if (camundaProcess) await this.waitForFinishedBusinessProcess(this.getGaCCDCaseData()?.id);
    await this.fetchAndSetGaCCDCaseData(this.getGaCCDCaseData()?.id, undefined, expectedState);
  }

  async retryGAWaEvent(
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
      expectedState
    } : {
      retries?: number,
      camundaProcess?: boolean,
      startWithWATaskName?: boolean,
      verifySuccessEvent?: boolean
      expectedState?: GaCaseState | GaCaseState[]
    } = {},
  ) {
    await super.setupBankHolidays();
    await super.setDebugTestData();
    let waTask;
    if(config.waEnabled)
      waTask = await super.retrieveAndAssignWATask(user, validTask);
    while (retries >= 0) {
      try {
        if (startWithWATaskName) {
          await this.gaExuiDashboardActions.startWithGaWaTaskName(ccdEvent, waTask!);
        } else {
          await this.gaExuiDashboardActions.startGaCCDEvent(ccdEvent);
        }
        await eventActions();
        break;
      } catch (error) {
        if (retries <= 0) throw error;
        console.log(`Event: ${ccdEvent.id} failed, trying again (Retries left: ${retries})`);
        retries--;
        await this.gaExuiDashboardActions.clearCCDEvent();
      }
    }
    await confirmActions();
    if (verifySuccessEvent) await this.gaExuiDashboardActions.verifySuccessEvent(ccdEvent);
    if (camundaProcess) await this.waitForFinishedBusinessProcess(this.getGaCCDCaseData()?.id);
    await this.fetchAndSetGaCCDCaseData(this.getGaCCDCaseData()?.id, undefined, expectedState);
    if(config.waEnabled)
      await super.completeWATask(user, waTask!);
  }
}
