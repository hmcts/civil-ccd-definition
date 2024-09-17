import UserKey from "../enums/user-key";
import config from "./config";
import Environment from "../enums/environment";
import UserRole from "../enums/user-role";
import User from "../types/user";
import UserStateHelper from "../helpers/users-state-helper";

const defaultPassword = process.env.DEFAULT_PASSWORD;
const judgeDefaultPassword = process.env.JUDGE_DEFAULT_PASSWORD;
const iacDefaultPassword = process.env.IAC_DEFAULT_PASSWORD;
const defaultPasswordSystemUser = process.env.SYSTEM_USER_PASSWORD;

const getUser = (user: User): User => {
  return (
    UserStateHelper.getUserFromState(user.key) ?? user
  );
};

export const claimantSolicitor: User = getUser(
  {
    email: "hmcts.civil+organisation.1.solicitor.1@gmail.com",
    password: defaultPassword,
    key: UserKey.CLAIMANT_SOLICITOR,
    role: UserRole.CASEWORKER,
    orgId: config.environment === Environment.DEMO ? "B04IXE4" : "Q1KOKP2"
  }
);

export const claimantSolicitorBulkScan: User = getUser(
  {
    email: "hmcts.civil+organisation.1.solicitor.2@gmail.com",
    password: defaultPassword,
    key: UserKey.CLAIMANT_SOLICITOR_BULK_SCAN,
    role: UserRole.CASEWORKER,
    orgId: config.environment === Environment.DEMO ? "B04IXE4" : "Q1KOKP2"
  }
);

export const defendantSolicitor1: User = getUser(
  {
    email: "hmcts.civil+organisation.2.solicitor.1@gmail.com",
    password: defaultPassword,
    key: UserKey.DEFENDANT_SOLICITOR_1,
    role: UserRole.CASEWORKER,
    orgId: process.env.ENVIRONMENT === Environment.DEMO ? "DAWY9LJ" : "79ZRSOU"
  }
);

export const defendantSolicitor2: User = getUser(
  {
    email: "hmcts.civil+organisation.3.solicitor.1@gmail.com",
    password: defaultPassword,
    key: UserKey.DEFENDANT_SOLICITOR_2,
    role: UserRole.CASEWORKER,
    orgId: process.env.ENVIRONMENT === Environment.DEMO ? "LCVTI1I" : "H2156A0"
  }
);

export const admin: User = getUser(
  {
    email: "civil-admin@mailnesia.com",
    password: defaultPassword,
    key: UserKey.CIVIL_ADMIN,
    role: UserRole.CASEWORKER,
  }
);
