import BaseTestData from './base-test-data';
import RequestsFactory from '../requests/requests-factory';
import User from '../models/user';
import { bankHolidays } from '../config/data';
import { CCDEvent } from '../models/ccd/ccd-events';
import ObjectHelper from '../helpers/object-helper';
import TestData from '../models/test-data';
import { civilSystemUpdate } from '../config/users/exui-users';
import config from '../config/config';
import DateHelper from '../helpers/date-helper';
import WATask from '../models/wa-task';
import CaseState from '../enums/case-state';
import CCDCaseData from '../models/ccd/ccd-case-data';
import FileSystemHelper from '../helpers/file-system-helper';
import FileType from '../enums/file-type';

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

  private async validatePages(
    ccdEvent: CCDEvent,
    pageDataMap: Record<string, any>,
    user: User,
    ccdEventToken: string,
  ): Promise<CCDCaseData> {
    const { ccdRequests } = this.requestsFactory;
    let eventData: CCDCaseData = {};
    for (const pageId of Object.keys(pageDataMap)) {
      eventData = ObjectHelper.deepSpread(eventData, pageDataMap[pageId]);
      const pageData = await ccdRequests.validatePageData(
        ccdEvent,
        user,
        pageId,
        pageDataMap[pageId],
        eventData,
        ccdEventToken,
      );
      eventData = ObjectHelper.deepSpread(eventData, pageData);
    }
    return eventData;
  }

  protected async submitCCDEvent(user: User, ccdEvent: CCDEvent, pageDataMap: Record<string, any>, expectedState: CaseState) {
    const { ccdRequests } = this.requestsFactory;
    const eventToken = await ccdRequests.startEvent(user, ccdEvent);
    const eventData = await this.validatePages(
      ccdEvent,
      pageDataMap,
      user,
      eventToken,
    );
    const eventCaseData = await ccdRequests.submitEvent(
      user,
      ccdEvent,
      expectedState,
      eventData,
      eventToken,
    );
    await this.waitForFinishedBusinessProcess(eventCaseData.id);
    await this.fetchAndSetCCDCaseData(eventCaseData.id);
  }

  protected async waitForFinishedBusinessProcess(caseId?: number) {
    const { civilServiceRequests } = this.requestsFactory;
    await this.setupUserData(civilSystemUpdate);
    await civilServiceRequests.waitForFinishedBusinessProcess(
      civilSystemUpdate,
      caseId ?? this.ccdCaseData.id,
    );
  }

  protected async fetchAndSetCCDCaseData(caseId?: number) {
    const { ccdRequests } = this.requestsFactory;
    await this.setupUserData(civilSystemUpdate);
    super.setCCDCaseData = await ccdRequests.fetchCCDCaseData(
      civilSystemUpdate,
      caseId ?? this.ccdCaseData.id,
    );
  }

  protected async setDebugTestData() {
    if (config.debugCaseId && !super.isDebugTestDataSetup) {
      await this.fetchAndSetCCDCaseData(config.debugCaseId);
      super.setClaimantDefendantPartyTypes();
      super.setCaseFlags();
      super.setIsDebugTestDataSetup();
    }
  }

  protected async retrieveAndAssignWATask(user: User, validTask: WATask): Promise<string> {
    const { workAllocationsRequests } = this.requestsFactory;
    const waTask = await workAllocationsRequests.retrieveTask(user, this.ccdCaseData.id, validTask);
    await workAllocationsRequests.assignTask(user, waTask);
    return waTask.id;
  }

  protected async completeWATask(user: User, waTaskId: string) {
    const { workAllocationsRequests } = this.requestsFactory;
    await workAllocationsRequests.completeTask(user, waTaskId);
  }
  
}
