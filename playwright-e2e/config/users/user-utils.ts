import UserKey from '../../enums/user-key';
import UserStateHelper from '../../helpers/users-state-helper';
import User from '../../types/user';

let userKeysBeingUsed = new Set<UserKey>();

export const getUser = (user: User): User => {
  if (!userKeysBeingUsed.has(user.key)) {
    userKeysBeingUsed.add(user.key);
    return UserStateHelper.getUserFromState(user.key) ?? user;
  }
  throw new Error(
    `Cannot assign user: ${user.email} with key: ${user.key} as it is already in use`,
  );
};

export const clearUserKeysBeingUsed = () => (userKeysBeingUsed = undefined);
