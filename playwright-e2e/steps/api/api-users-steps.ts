import { AllMethodsStep } from '../../decorators/test-steps';
import User from '../../types/user';
import BaseApiSteps from '../../base/base-api-steps';
import RequestsFactory from '../../requests/requests-factory';
import TestData from '../../types/test-data';
import UserStateHelper from '../../helpers/users-state-helper';

@AllMethodsStep()
export default class ApiUsersSteps extends BaseApiSteps {
  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(requestsFactory, testData);
  }

  async SetupUsersData(users: User[]) {
    const { idamRequests } = this.requestsFactory;
    for (const user of users) {
      await idamRequests.getUserData(user);
    }
    UserStateHelper.addUsersToState(users);
  }

  async SetupUserData(user: User) {
    const { idamRequests } = this.requestsFactory;
    await idamRequests.getUserData(user);
    UserStateHelper.addUserToState(user);
  }
}
