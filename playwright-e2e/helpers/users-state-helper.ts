import User from "../types/users/user";
import UserRole from "../enums/user-role";
import FileSystemHelper from "./file-system-helper";
import FileType from "../enums/file-type";
import UserType from "../enums/user-type";
import filePaths from "../config/file-paths";
import config from "../config/config";

export default class UserStateHelper {
  private static getUserStatePath = (userType: UserType) => `${filePaths.users}/${userType}-user.json`;

  private static getUsersStatePath = (userType: UserType) => `${filePaths.users}/${userType}-users.json`;

  static generateCitizenUsers = (userType: UserType): User[] => {
    return Array.from({ length: config.playwright.workers }, (_, index) => ({
      email: `${userType}citizen-${Math.random().toString(36).slice(2, 9).toLowerCase()}@gmail.com`,
      password: process.env.SMOKE_TEST_USER_PASSWORD,
      role: UserRole.CITIZEN,
      type: userType,
      cookiesPath: `${filePaths.userCookies}/${userType}-${index + 1}.json`,
    }));
  };

  static addUsersToState = (users: User[]) => {
    FileSystemHelper.writeFile(users, this.getUserStatePath(users[0].type), FileType.JSON);
  };

  static addUserToState = (user: User) => {
    FileSystemHelper.writeFile(user, this.getUserStatePath[user.type], FileType.JSON);
  };

  static getUserFromState = (userType: UserType): User => {
    let user: User;
    try {
      user = FileSystemHelper.readFile(this.getUserStatePath(userType), FileType.JSON);
      return user;
    } catch {
      return null;
    }
  };

  static getUsersFromState = (userType: UserType): User[] => {
    let users: User[];
    try {
      users = FileSystemHelper.readFile(this.getUsersStatePath(userType), FileType.JSON);
      return users;
    } catch {
      return null;
    }
  };

  static userStateExists = (userType: UserType) => {
    return FileSystemHelper.exists(this.getUserStatePath(userType));
  };

  static usersStateExists = (userType: UserType) => {
    return FileSystemHelper.exists(this.getUsersStatePath(userType));
  };

  static deleteUserState = (userType: UserType) => {
    FileSystemHelper.delete(this.getUserStatePath(userType));
  };

  static deleteUsersState = (userType: UserType) => {
    FileSystemHelper.delete(this.getUsersStatePath(userType));
  };

  static deleteAllUsersState = () => {
    FileSystemHelper.delete(`${filePaths.users}/`);
  };
}
