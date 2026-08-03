import UserKey from "../../constants/users/user-key";
import UserRole from "../../constants/users/user-role";
import User from "../../models/users/user";
import filePaths from "../file-paths";
import { getUsers, generateCitizenUsers } from './user-utils';
import config from "../config";

export const claimants: User[] = config.users.claimantCitizenEmail
  ? [
      {
        name: 'Claimant Citizen',
        email: config.users.claimantCitizenEmail,
        password: config.users.defaultPassword,
        role: UserRole.CITIZEN,
        key: UserKey.CLAIMANT_CITIZEN,
        cookiesPath: `${filePaths.userCookies}/${UserKey.CLAIMANT_CITIZEN}-0.json`,
      },
    ]
  : getUsers(generateCitizenUsers(UserKey.CLAIMANT_CITIZEN));

export const defendants: User[] = config.users.defendantCitizenEmail
  ? [
      {
        name: 'Defendant Citizen',
        email: config.users.defendantCitizenEmail,
        password: config.users.defaultPassword,
        role: UserRole.CITIZEN,
        key: UserKey.DEFENDANT_CITIZEN,
        cookiesPath: `${filePaths.userCookies}/${UserKey.DEFENDANT_CITIZEN}-0.json`,
      },
    ]
  : getUsers(generateCitizenUsers(UserKey.DEFENDANT_CITIZEN));