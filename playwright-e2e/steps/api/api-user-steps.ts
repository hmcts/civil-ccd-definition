import { AllMethodsStep } from '../../decorators/test-steps';
import User from '../../models/user';
import BaseApiSteps from '../../base/base-api-steps';
import RequestsFactory from '../../requests/requests-factory';
import TestData from '../../models/test-data';
import UserStateHelper from '../../helpers/users-state-helper';
import UserAssignedCasesHelper from '../../helpers/user-assigned-cases-helper';
import BaseSteps from '../../base/base-steps';

@AllMethodsStep()
export default class ApiUserSteps extends BaseApiSteps {
  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(requestsFactory, testData);
  }

  async SetupUsersData(users: User[]) {
    for (const user of users) {
      await this.setupUserData(user);
    }
    UserStateHelper.addUsersToState(users);
  }

  async SetupUserData(user: User) {
    await this.setupUserData(user);
    UserStateHelper.addUserToState(user);
  }
}
