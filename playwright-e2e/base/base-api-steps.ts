import BaseSteps from './base-steps';
import TestData from '../types/test-data';
import RequestsFactory from '../requests/requests-factory';
import User from '../types/user';

export default abstract class BaseApiSteps extends BaseSteps {
  private _requestsFactory: RequestsFactory;

  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(testData);
    this._requestsFactory = requestsFactory;
  }

  protected get requestsFactory() {
    return this._requestsFactory;
  }

  protected async setupUserData(user: User) {
    if (!user.accessToken || !user.userId) {
      const { idamRequests } = this.requestsFactory;
      if (!user.accessToken) {
        const accessToken = await idamRequests.getAccessToken(user);
        user.accessToken = accessToken;
      } else {
        const userId = await idamRequests.getUserId(user);
        user.userId = userId;
      }
    }
  }
}
