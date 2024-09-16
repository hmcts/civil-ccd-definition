import User from "../../types/users/user";
import UserRole from "../../enums/user-role";
import UserType from "../../enums/user-type";
import filePaths from "../file-paths";
import UserStateHelper from "../../helpers/users-state-helper";
import SolicitorUser from "../../types/users/solicitor-user";

const defaultPassword = process.env.DEFAULT_PASSWORD;
const judgeDefaultPassword = process.env.JUDGE_DEFAULT_PASSWORD;
const iacDefaultPassword = process.env.IAC_DEFAULT_PASSWORD;
const defaultPasswordSystemUser = process.env.SYSTEM_USER_PASSWORD;

export const getUser = (email: string, password: string, userType: UserType, userRole: UserRole): User => {
  return (
    UserStateHelper.getUserFromState(userType) ?? {
      email,
      password,
      type: userType,
      role: userRole,
      cookiesPath: `${filePaths.userCookies}/${userType}.json`,
    }
  );
};

export const getSolicitorUser = (email: string, orgId: string, userType: UserType): SolicitorUser => {
  return (UserStateHelper.getUserFromState(userType) ?? {
    email,
    defaultPassword,
    type: userType,
    role: UserRole.CASEWORKER,
    cookiesPath: `${filePaths.userCookies}/${userType}.json`,
    orgId,
  }) as SolicitorUser;
};
