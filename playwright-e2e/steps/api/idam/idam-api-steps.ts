import { AllMethodsStep } from '../../../decorators/test-steps';
import User from '../../../models/users/user';
import UserStateHelper from '../../../helpers/users-state-helper';
import BaseApi from '../../../base/base-api';
import { test } from '../../../playwright-fixtures/index';
import FileError from '../../../errors/file-error';
import { civilAdminUser, civilSystemUpdate } from '../../../config/users/exui-users';

@AllMethodsStep()
export default class IdamApiSteps extends BaseApi {
  async CreateCuiUsers(users: User[]) {
    await this.setupUserData(civilSystemUpdate);
    const { idamRequests } = super.requestsFactory;
    const userKey = users[0].key;
    if (UserStateHelper.usersStateExists(users[0])) {
      throw new FileError(`Cui users: ${userKey.toUpperCase()} already exists`);
    }
    if (!users.every((user) => user.key === users[0].key)) {
      throw new TypeError(`Users in ${users} must all have the same user type`);
    }
    users = await Promise.all(
      users.map(async (user) => {
        const idamUser = await idamRequests.createCitizenUser(user, civilSystemUpdate);
        const accessToken = await idamRequests.getAccessToken(user);
        return { userId: idamUser.id, accessToken: accessToken, ...user };
      }),
    );
    UserStateHelper.addUsersToState(users);
  }

  async DeleteCuiUsers(users: User[]) {
    await this.setupUserData(civilSystemUpdate);
    if (UserStateHelper.usersStateExists(users[0])) {
      const { idamRequests } = super.requestsFactory;
      await Promise.all(
        users.map((user) => idamRequests.deleteUser(user, civilSystemUpdate)),
      );
      UserStateHelper.deleteUsersState(users[0]);
    } else {
      test.skip();
    }
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
