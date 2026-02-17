import BaseTestData from './base-test-data';
import RequestsFactory from '../requests/requests-factory';
import User from '../models/user';
import { bankHolidays } from '../config/data';
import { CCDEvent } from '../models/ccd/ccd-events';
import ObjectHelper from '../helpers/object-helper';
import TestData from '../models/test-data';
import { civilSystemUpdate, judgeRegion1User } from '../config/users/exui-users';
import config from '../config/config';
import DateHelper from '../helpers/date-helper';
import { validateTaskInfo } from '../helpers/wa-helper.ts';

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

  protected async validatePages(
    ccdEvent: CCDEvent,
    pageDataMap: Record<string, any>,
    user: User,
    ccdEventToken: string,
  ) {
    const { ccdRequests } = this.requestsFactory;
    let eventData = {};
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

  protected async retrieveWaTask(task: any) {
    const { waRequests } = this.requestsFactory;
    const taskType = task.type; //FastTrackDirections
    const caseId = this.ccdCaseData.id; //1771252266620196
    const allRetrievedTasks = await waRequests.retrieveWaTasks(judgeRegion1User, caseId, taskType);

    const retrievedTask = allRetrievedTasks.tasks?.find((task: any) => task.type === taskType);
    if (!retrievedTask?.id) {
      throw new Error(`WA task not found for caseId ${caseId}, with the type ${taskType}`);
    }
    validateTaskInfo(retrievedTask, task);
    return retrievedTask;
  }

  protected async assignWaTask(retrievedTask: any) {
    const { waRequests } = this.requestsFactory;
    await waRequests.actionTask(judgeRegion1User, retrievedTask.id, 'claim');
  }

  protected async retryWaApiTask(
    apiActions: () => Promise<void>,
    retries = 25,
    retryTimeInterval = 3000,
  ) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await apiActions();
        console.log(`Success on attempt ${attempt}`);
        return;
      } catch (error) {
        if (attempt === retries) throw error;
        console.log(`Attempt ${attempt} failed. Retrying in ${retryTimeInterval}ms...`);
        await new Promise((resolve) => setTimeout(resolve, retryTimeInterval));
      }
    }
  }
}
