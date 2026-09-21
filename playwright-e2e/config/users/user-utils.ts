import UserKey from '../../constants/users/user-key';
import UserRole from '../../constants/users/user-role';
import UserStateHelper from '../../helpers/users-state-helper';
import User from '../../models/users/user';
import config from '../config';
import filePaths from '../file-paths';

export const defaultPassword = process.env.DEFAULT_PASSWORD;


let userKeysBeingUsed: Set<UserKey> | undefined = new Set<UserKey>();

export const hasClaimantCitizenEmail = () => config.users.claimantCitizenEmail;
export const hasDefendantCitizenEmail = () => config.users.defendantCitizenEmail;

export const generateCitizenUsers = (userName: string,userKey: UserKey): User[] => {
    return Array.from({ length: config.playwright.workers }, (_, index) => ({
      name: `${userName} ${index + 1}`,
      email: `${userKey}-${Math.random().toString(36).slice(2, 9).toLowerCase()}@gmail.com`,
      password: process.env.DEFAULT_PASSWORD,
      role: UserRole.CITIZEN,
      key: userKey,
      cookiesPath: `${filePaths.userCookies}/${userKey}-${index + 1}.json`,
      workerIndex: index,
    }));
  };

export const getUser = (user: User): User => {
  if (!userKeysBeingUsed!.has(user.key)) {
    userKeysBeingUsed!.add(user.key);
    return (
      UserStateHelper.getUserFromState(user) ?? {
        ...user,
        cookiesPath: `${filePaths.userCookies}/${user.key}.json`,
      }
    );
  }
  throw new Error(`Cannot have multiple users or user arrays with key: ${user.key}`);
};

export const getUsers = (users: User[]): User[] => {
  if (!userKeysBeingUsed!.has(users[0].key)) {
    userKeysBeingUsed!.add(users[0].key);
    return (
      UserStateHelper.getUsersFromState(users[0]) ??
      users.map((user, index) => ({
        ...user,
        cookiesPath: `${filePaths.userCookies}/${user.key}-${index}.json`,
      }))
    );
  }
  throw new Error(`Cannot have multiple user or user arrays with key: ${users[0].key}`);
};

export const clearUserKeysBeingUsed = () => (userKeysBeingUsed = undefined);
