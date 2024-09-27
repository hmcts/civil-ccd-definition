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

  static addUsersToState = (users: User[]) => {
    FileSystemHelper.writeFile(users, this.getUserStatePath(users[0].key), FileType.JSON);
    console.log(
      `Users with key: ${users[0].key} ${this.userStateExists(users[0]) ? 'successfully updated' : 'successfully created'}`,
    );
  };

  static addUserToState = (user: User) => {
    FileSystemHelper.writeFile(user, this.getUserStatePath[user.key], FileType.JSON);
    console.log(
      `User with key: ${user.key} ${this.userStateExists(user) ? 'successfully updated' : 'successfully created'}`,
    );
  };

  static getUserFromState = ({ key: userKey }: User): User => {
    let user: User;
    try {
      user = FileSystemHelper.readFile(this.getUserStatePath(userKey), FileType.JSON);
      return user;
    } catch {
      return null;
    }
  };

  static getUsersFromState = ([{ key: userKey }]: User[]): User[] => {
    let users: User[];
    try {
      users = FileSystemHelper.readFile(this.getUsersStatePath(userKey), FileType.JSON);
      return users;
    } catch {
      return null;
    }
  };

  static userStateExists = ({ key: userKey }: User) => {
    return FileSystemHelper.exists(this.getUserStatePath(userKey));
  };

  static usersStateExists = ([{ key: userKey }]: User[]) => {
    return FileSystemHelper.exists(this.getUsersStatePath(userKey));
  };

  static deleteUserState = ({ key: userKey }: User) => {
    FileSystemHelper.delete(this.getUserStatePath(userKey));
  };

  static deleteUsersState = ([{ key: userKey }]: User[]) => {
    FileSystemHelper.delete(this.getUsersStatePath(userKey));
  };

  static deleteAllUsersState = () => {
    FileSystemHelper.delete(`${filePaths.users}/`);
  };
}
