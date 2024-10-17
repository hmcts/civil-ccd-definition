import UserKey from '../../enums/user-key';
import config from '../config';
import Environment from '../../enums/environment';
import UserRole from '../../enums/user-role';
import User from '../../types/user';
import { getUser } from './user-utils';

const defaultPassword = process.env.DEFAULT_PASSWORD;
const judgeDefaultPassword = process.env.JUDGE_DEFAULT_PASSWORD;
const iacDefaultPassword = process.env.IAC_DEFAULT_PASSWORD;
const defaultPasswordSystemUser = process.env.SYSTEM_USER_PASSWORD;

export const claimantSolicitorUser: User = getUser({
  email: 'hmcts.civil+organisation.1.solicitor.1@gmail.com',
  password: defaultPassword,
  key: UserKey.CLAIMANT_SOLICITOR,
  role: UserRole.CASEWORKER,
  orgId: config.environment === Environment.DEMO ? 'B04IXE4' : 'Q1KOKP2',
});

export const claimantSolicitorBulkScanUser: User = getUser({
  email: 'hmcts.civil+organisation.1.solicitor.2@gmail.com',
  password: defaultPassword,
  key: UserKey.CLAIMANT_SOLICITOR_BULK_SCAN,
  role: UserRole.CASEWORKER,
  orgId: config.environment === Environment.DEMO ? 'B04IXE4' : 'Q1KOKP2',
});

export const defendantSolicitor1User: User = getUser({
  email: 'hmcts.civil+organisation.2.solicitor.1@gmail.com',
  password: defaultPassword,
  key: UserKey.DEFENDANT_SOLICITOR_1,
  role: UserRole.CASEWORKER,
  orgId: process.env.ENVIRONMENT === Environment.DEMO ? 'DAWY9LJ' : '79ZRSOU',
});

export const defendantSolicitor2User: User = getUser({
  email: 'hmcts.civil+organisation.3.solicitor.1@gmail.com',
  password: defaultPassword,
  key: UserKey.DEFENDANT_SOLICITOR_2,
  role: UserRole.CASEWORKER,
  orgId: process.env.ENVIRONMENT === Environment.DEMO ? 'LCVTI1I' : 'H2156A0',
});

export const adminUser: User = getUser({
  email: 'civil-admin@mailnesia.com',
  password: defaultPassword,
  key: UserKey.CIVIL_ADMIN,
  role: UserRole.CASEWORKER,
});

export const nbcRegion1User: User = getUser({
  email: 'nbc_admin_region1@justice.gov.uk',
  password: defaultPassword,
  key: UserKey.NBC_REGION_1,
  role: UserRole.CASEWORKER,
});

export const nbcRegion2User: User = getUser({
  email: 'nbc_admin_region2@justice.gov.uk',
  password: defaultPassword,
  key: UserKey.NBC_REGION_2,
  role: UserRole.CASEWORKER,
});

export const nbcRegion4User: User = getUser({
  email: 'nbc_admin_region4@justice.gov.uk',
  password: defaultPassword,
  key: UserKey.NBC_REGION_4,
  role: UserRole.CASEWORKER,
});

export const nbcLocalUser: User = getUser({
  email: 'nbc-team-leader@mailnesia.com',
  password: defaultPassword,
  key: UserKey.NBC_LOCAL,
  role: UserRole.CASEWORKER,
});

export const judgeRegion1User: User = getUser({
  email: '4917924EMP-@ejudiciary.net',
  password: judgeDefaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.JUDGE_REGION_1,
});

export const judgeRegion2User: User = getUser({
  email: 'EMP42506@ejudiciary.net',
  password: judgeDefaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.JUDGE_REGION_2,
});

export const judgeRegion4User: User = getUser({
  email: '4924246EMP-@ejudiciary.net',
  password: judgeDefaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.JUDGE_REGION_4,
});

export const hearingCenterAdminLocalUser: User = getUser({
  email: 'hearing-centre-admin-01@example.com',
  password: defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.HEARING_CENTER_ADMIN_LOCAL,
});

export const hearingCenterAdminRegion1User: User = getUser({
  email: 'hearing_center_admin_reg1@justice.gov.uk',
  password: defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.HEARING_CENTER_ADMIN_REGION_1,
});

export const hearingCenterAdminRegion2User: User = getUser({
  email: 'hearing_center_admin_reg2@justice.gov.uk',
  password: defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.HEARING_CENTER_ADMIN_REGION_2,
});

export const hearingCenterAdminRegion4User: User = getUser({
  email: 'hearing_center_admin_reg4@justice.gov.uk',
  password: defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.HEARING_CENTER_ADMIN_REGION_4,
});

export const tribunalCaseworkerWithRegionId4User: User = getUser({
  email: 'tribunal_legal_caseworker_reg4@justice.gov.uk',
  password: defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.TRIBUNAL_CASEWORKER_REGION_4,
});

export const ctscAdminUser: User = getUser({
  email: 'ctsc_admin@justice.gov.uk',
  password: defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.CTSC_ADMIN,
});

export const exuiAuthSetupUsers = [
  claimantSolicitorUser,
  defendantSolicitor1User,
  adminUser,
  judgeRegion1User,
];

export const exuiUserDataSetupUsers = [
  claimantSolicitorUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
  adminUser,
  judgeRegion1User,
  judgeRegion4User,
  hearingCenterAdminRegion1User,
  hearingCenterAdminRegion4User,
];
