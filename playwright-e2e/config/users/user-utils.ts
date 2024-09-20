import UserStateHelper from "../../helpers/users-state-helper";
import User from "../../types/user";

let userKeyToEmail = {};

export const getUser = (user: User): User => {
  const email = userKeyToEmail[user.key]; 
  if(!email) {
    userKeyToEmail[user.key] = user.email;
    return UserStateHelper.getUserFromState(user.key) ?? user;
  }
  throw new Error(`Cannot assign user:${user.email} with key:${user.key} as it is already assign to user:${email}`)
};

export const clearUserKeyToEmail = () => userKeyToEmail = undefined;