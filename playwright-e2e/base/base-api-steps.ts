import BaseSteps from './base-steps';
import TestData from '../types/test-data';
import RequestsFactory from '../requests/requests-factory';
import User from '../types/user';
import UserStateHelper from '../helpers/users-state-helper';

export default abstract class BaseApiSteps extends BaseSteps {
  private _requestsFactory: RequestsFactory;

  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(testData);
    this._requestsFactory = requestsFactory;
  }

  get requestsFactory() {
    return this._requestsFactory;
  }
}
