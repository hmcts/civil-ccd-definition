import BaseSteps from './base-steps';
import TestData from '../models/test-data';
import RequestsFactory from '../requests/requests-factory';
import User from '../models/user';
import { bankHolidays } from '../config/data';

export default abstract class BaseApiSteps extends BaseSteps {
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
      const today = new Date();
      const { govUKRequests } = this.requestsFactory;
      const bankHolidaysJson = await govUKRequests.fetchBankHolidays();

      const events = bankHolidaysJson['england-and-wales'].events;

      for (const event of events) {
        const eventDate = new Date(event.date);
        if (eventDate > today) {
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
}
