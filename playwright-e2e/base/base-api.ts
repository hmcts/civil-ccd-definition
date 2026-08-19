import BaseTestData from './base-test-data';
import RequestsFactory from '../requests/requests-factory';
import User from '../models/users/user';
import { bankHolidays } from '../config/data';
import { CCDEvent } from '../models/ccd-events/ccd-events';
import ObjectHelper from '../helpers/object-helper';
import TestData from '../models/test-utils/test-data';
import { civilSystemUpdate } from '../config/users/exui-users';
import config from '../config/config';
import DateHelper from '../helpers/date-helper';
import WATask from '../models/wa-task';
import CaseState from '../constants/cases/case-state';
import CCDCaseData from '../models/ccd-case-data';
import ccdEvents from '../constants/ccd-events/ccd-events';

export default abstract class BaseApi extends BaseTestData {
  private _requestsFactory: RequestsFactory;

  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(testData);
    this._requestsFactory = requestsFactory;
  }

  protected get requestsFactory() {
    return this._requestsFactory;
  }

  protected async setupBankHolidays() {
    if (!bankHolidays.length) {
      const { govUKRequests } = this.requestsFactory;
      const bankHolidaysJson = await govUKRequests.fetchBankHolidays();

      const events = bankHolidaysJson['england-and-wales'].events;

      for (const event of events) {
        const eventDate = new Date(event.date);
        if (eventDate > DateHelper.subtractFromToday({ years: 2 })) {
          bankHolidays.push(event.date);
        }
      }
    }
  }

  protected async setupUserData(user: User) {
    if (!user.accessToken || !user.userId) {
      const { idamRequests } = this.requestsFactory;
      if (!user.accessToken) {
        const accessToken = await idamRequests.getAccessToken(user);
        user.accessToken = accessToken;
      }
      if (!user.userId) {
        const userId = await idamRequests.getUserId(user);
        user.userId = userId;
      }
    }
  }

  protected async setupApiStep(user: User) {
    await this.setupBankHolidays();
    await this.setupUserData(user);
    await this.setDebugTestData();
  }

  private async validatePages(
    ccdEvent: CCDEvent,
    startEventCaseData: CCDCaseData,
    pageDataMap: Record<string, any>,
    user: User,
    ccdEventToken: string,
  ): Promise<CCDCaseData> {
    const { ccdRequests } = this.requestsFactory;
    let eventData = startEventCaseData ?? {};
    for (const pageId of Object.keys(pageDataMap)) {
      if (pageId === 'sendAndReplyOption') {
        pageDataMap[pageId] = pageDataMap[pageId](eventData.messagesToReplyTo)
      }
      eventData = ObjectHelper.deepSpread(eventData, pageDataMap[pageId]);
      if (pageId !== 'Undefine') {
        const pageData = await ccdRequests.validatePageData(
          ccdEvent,
          user,
          pageId,
          pageDataMap[pageId],
          eventData,
          ccdEventToken,
          this.ccdCaseData?.id,
        );
        eventData = ObjectHelper.deepSpread(eventData, pageData);
      }
    }
    return eventData;
  }

  protected async submitCCDEvent(
    user: User,
    ccdEvent: CCDEvent,
    pageDataMap: Record<string, any>,
    expectedState?: CaseState,
  ) {
    const { ccdRequests } = this.requestsFactory;
    const { eventToken, startEventCaseData } = await ccdRequests.startEvent(
      user,
      ccdEvent,
      this.ccdCaseData?.id,
    );
    
    const eventData = await this.validatePages(
      ccdEvent,
      startEventCaseData,
      pageDataMap,
      user,
      eventToken,
    );

    const eventCaseData = await ccdRequests.submitEvent(
      user,
      ccdEvent,
      eventData,
      eventToken,
      this.ccdCaseData?.id,
    );
    await this.waitForFinishedBusinessProcess(eventCaseData.id, undefined, expectedState);

    if(ccdEvent === ccdEvents.INITIATE_GENERAL_APPLICATION) {
      await this.waitForGAFinishedBusinessProcess(eventCaseData.id);
      await this.fetchAndSetCCDCaseData(eventCaseData.id);
      await this.waitForFinishedBusinessProcess(this.getGaCCDCaseIdFromParentCase());
      await this.fetchAndSetGaCCDCaseData(this.getGaCCDCaseIdFromParentCase());
      console.log(`General application, caseId: ${this.getGaCCDCaseIdFromParentCase()} successfully created`)
    } else {
      await this.fetchAndSetCCDCaseData(eventCaseData.id);
    }
  }

  protected async submitGaCCDEvent(
    user: User,
    ccdEvent: CCDEvent,
    pageDataMap: Record<string, any>,
    expectedState?: CaseState,
  ) {
    const { ccdRequests } = this.requestsFactory;
    const { eventToken, startEventCaseData } = await ccdRequests.startEvent(
      user,
      ccdEvent,
      this.getGaCCDCaseData()?.id,
    );
    
    const eventData = await this.validatePages(
      ccdEvent,
      startEventCaseData,
      pageDataMap,
      user,
      eventToken,
    );

    const eventCaseData = await ccdRequests.submitEvent(
      user,
      ccdEvent,
      eventData,
      eventToken,
      this.getGaCCDCaseData()?.id,
    );
    await this.waitForFinishedBusinessProcess(eventCaseData.id, undefined, expectedState);
    await this.fetchAndSetGaCCDCaseData(eventCaseData.id);
  }

  protected async startCCDEventError(
    user: User,
    ccdEvent: CCDEvent,
  ): Promise<string> {
    await this.setupApiStep(user);
    const { ccdRequests } = this.requestsFactory;
    return ccdRequests.startEventError(
      user,
      ccdEvent,
      this.ccdCaseData?.id,
    );
  }

  protected async submitCaseFlagsEvent(
    user: User,
    ccdEvent: CCDEvent,
    caseFlagData: (caseFlagLocationData?: any) => Partial<CCDCaseData>,
    expectedState?: CaseState,
  ) {
    const { ccdRequests } = this.requestsFactory;
    const { eventToken, startEventCaseData } = await ccdRequests.startEvent(
      user,
      ccdEvent,
      this.ccdCaseData?.id,
    );
    const caseFlagLocation = caseFlagData.name as keyof CCDCaseData;
    if (!caseFlagLocation) {
      throw new Error('Case flags data component must be a named function.');
    }

    const eventCaseData = await ccdRequests.submitEvent(
      user,
      ccdEvent,
      {
        ...startEventCaseData,
        ...(await caseFlagData(startEventCaseData[caseFlagLocation])),
      },
      eventToken,
      this.ccdCaseData?.id,
    );
    await this.waitForFinishedBusinessProcess(eventCaseData.id, undefined, expectedState);
    await this.fetchAndSetCCDCaseData(eventCaseData.id);
  }

  protected async submitQmEvent(
    user: User,
    ccdEvent: CCDEvent,
    qmEventData: Record<string, any>,
    expectedState?: CaseState,
  ) {
    const { ccdRequests } = this.requestsFactory;
    const { eventToken } = await ccdRequests.startEvent(
      user,
      ccdEvent,
      this.ccdCaseData?.id,
    );

    const eventCaseData = await ccdRequests.submitEvent(
      user,
      ccdEvent,
      qmEventData,
      eventToken,
      this.ccdCaseData?.id,
      expectedState,
    );
    await this.waitForFinishedBusinessProcess(eventCaseData.id);
    await this.fetchAndSetCCDCaseData(eventCaseData.id);
  }

  protected async submitNocEvent(
    newSolicitor: User,
    oldSolicitor?: User,
    nocData?: { question_id: string, value: string }[],
  ) {
    const caseId = this.ccdCaseData?.id!;

    const { caseAssignmentServiceRequests, ccdRequests } = this.requestsFactory;
    await caseAssignmentServiceRequests.validateNocAnswers(caseId, nocData!, newSolicitor);
    await caseAssignmentServiceRequests.submitNocRequest(caseId, nocData!, newSolicitor);

    await this.waitForFinishedBusinessProcess(caseId);
    
    if (oldSolicitor)
      await ccdRequests.fetchCCDCaseData(oldSolicitor, caseId, 404);
    await ccdRequests.fetchCCDCaseData(newSolicitor, caseId);
    await this.fetchAndSetCCDCaseData(caseId);
  }

  protected async submitCuiEvent(
    user: User,
    ccdEvent: CCDEvent,
    caseDataUpdate: CCDCaseData,
    expectedState?: CaseState,
  ): Promise<CCDCaseData> {
    const { civilServiceRequests } = this.requestsFactory;
    const payload = {
      event: ccdEvent.id,
      caseDataUpdate,
    };

    const eventCaseData = await civilServiceRequests.submitEventCitizen(
      user,
      payload,
      this.ccdCaseData?.id ?? 'draft',
    );

    await this.waitForFinishedBusinessProcess(eventCaseData.id, undefined, expectedState);
    await this.fetchAndSetCCDCaseData(eventCaseData.id);
    return eventCaseData;
  }

  protected async submitWAEvent(
    user: User,
    validTask: WATask,
    ccdEvent: CCDEvent,
    pageDataMap: Record<string, any>,
    expectedState?: CaseState,
  ) {
    const waTask = await this.retrieveAndAssignWATask(user, validTask);
    await this.submitCCDEvent(user, ccdEvent, pageDataMap, expectedState);
    await this.completeWATask(user, waTask.id);
  }

  protected async waitForFinishedBusinessProcess(
    caseId?: number,
    user?: User,
    expectedCaseState?: CaseState,
  ) {
    const { civilServiceRequests } = this.requestsFactory;
    await this.setupUserData(civilSystemUpdate);
    await civilServiceRequests.waitForFinishedBusinessProcess(
      user ?? civilSystemUpdate,
      caseId ?? this.ccdCaseData?.id,
      expectedCaseState,
    );
  }

  protected async waitForGAFinishedBusinessProcess(caseId?: number, user?: User) {
    const { civilServiceRequests } = this.requestsFactory;
    await this.setupUserData(civilSystemUpdate);
    await civilServiceRequests.waitForGAFinishedBusinessProcess(
      user ?? civilSystemUpdate,
      caseId ?? this.ccdCaseData?.id,
    );
  }

  protected async fetchAndSetCCDCaseData(
    caseId?: number,
    user?: User,
  ) {
    const { ccdRequests } = this.requestsFactory;
    await this.setupUserData(user ?? civilSystemUpdate);
    super.setCCDCaseData = await ccdRequests.fetchCCDCaseData(
      user ?? civilSystemUpdate,
      caseId ?? this.ccdCaseData?.id,
      200,
    );
  }

  protected async fetchAndSetGaCCDCaseData(caseId?: number, user?: User) {
    const { ccdRequests } = this.requestsFactory;
    await this.setupUserData(user ?? civilSystemUpdate);
    super.setGaCCDCaseData = await ccdRequests.fetchCCDCaseData(
      user ?? civilSystemUpdate,
      caseId ?? super.getGaCCDCaseIdFromParentCase(),
      200,
    );
  }

  protected async setDebugTestData() {
    if (
      (config.debugCaseId || (config.gaDebugCaseId && config.debugCaseId)) 
      && !super.isDebugTestDataSetup 
      && (!this.ccdCaseData?.id || (!this.ccdCaseData?.id && !super.getAllGaCCDCaseData.length))) {

      await this.fetchAndSetCCDCaseData(config.debugCaseId);
      super.setDebugClaimantDefendantPartyTypes();
      super.setDebugCaseFlags();
      if((config.gaDebugCaseId && config.debugCaseId) && !super.getAllGaCCDCaseData.length) {
        await this.fetchAndSetGaCCDCaseData(config.gaDebugCaseId)
      }
      super.setIsDebugTestDataSetup();
    }
  }

  protected async retrieveAndAssignWATask(user: User, validTask: WATask): Promise<WATask> {
    const { workAllocationsRequests } = this.requestsFactory;
    const waTask = await workAllocationsRequests.retrieveTask(
      user,
      validTask,
      this.ccdCaseData?.id,
    );
    await workAllocationsRequests.assignTask(user, waTask);
    return waTask;
  }

  protected async completeWATask(user: User, waTaskId?: string) {
    const { workAllocationsRequests } = this.requestsFactory;
    await workAllocationsRequests.completeTask(user, waTaskId);
  }
}
