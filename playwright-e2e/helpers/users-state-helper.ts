import User from '../types/user';
import UserRole from '../enums/user-role';
import FileSystemHelper from './file-system-helper';
import FileType from '../enums/file-type';
import UserKey from '../enums/user-key';
import filePaths from '../config/file-paths';
import config from '../config/config';

export default class UserStateHelper {
  private static getUserStatePath = (userType: UserKey) =>
    `${filePaths.users}/${userType}-user.json`;

  private static getUsersStatePath = (userType: UserKey) =>
    `${filePaths.users}/${userType}-users.json`;

  static generateCitizenUsers = (userKey: UserKey): User[] => {
    return Array.from({ length: config.playwright.workers }, (_, index) => ({
      email: `${userKey}citizen-${Math.random().toString(36).slice(2, 9).toLowerCase()}@gmail.com`,
      password: process.env.SMOKE_TEST_USER_PASSWORD,
      role: UserRole.CITIZEN,
      key: userKey,
      cookiesPath: `${filePaths.userCookies}/${userKey}-${index + 1}.json`,
    }));
  };

  static addUsersToState = (users: User[]) => {
    FileSystemHelper.writeFile(users, this.getUserStatePath(users[0].key), FileType.JSON);
  };

  static addUserToState = (user: User) => {
    FileSystemHelper.writeFile(user, this.getUserStatePath[user.key], FileType.JSON);
  };

  static getUserFromState = (userKey: UserKey): User => {
    let user: User;
    try {
      user = FileSystemHelper.readFile(this.getUserStatePath(userKey), FileType.JSON);
      return user;
    } catch {
      return null;
    }
  };

  static getUsersFromState = (userKey: UserKey): User[] => {
    let users: User[];
    try {
      users = FileSystemHelper.readFile(this.getUsersStatePath(userKey), FileType.JSON);
      return users;
    } catch {
      return null;
    }
  };

  static userStateExists = (userKey: UserKey) => {
    return FileSystemHelper.exists(this.getUserStatePath(userKey));
  };

  static usersStateExists = (userKey: UserKey) => {
    return FileSystemHelper.exists(this.getUsersStatePath(userKey));
  };

  static deleteUserState = (userKey: UserKey) => {
    FileSystemHelper.delete(this.getUserStatePath(userKey));
  };

  static deleteUsersState = (userKey: UserKey) => {
    FileSystemHelper.delete(this.getUsersStatePath(userKey));
  };

  static deleteAllUsersState = () => {
    FileSystemHelper.delete(`${filePaths.users}/`);
  };
}
