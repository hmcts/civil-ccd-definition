import UserKey from '../../constants/users/user-key';
import config from '../config';
import Environment from '../../constants/test-utils/environment';
import UserRole from '../../constants/users/user-role';
import User from '../../models/users/user';
import { getUser } from './user-utils';

export const claimantSolicitorUser: User = getUser({
  name: 'Claimant Solicitor',
  email: 'hmcts.civil+organisation.1.solicitor.1@gmail.com',
  password: config.users.defaultPassword,
  key: UserKey.CLAIMANT_SOLICITOR,
  role: UserRole.CASEWORKER,
  orgId: config.environment === Environment.DEMO ? 'B04IXE4' : 'Q1KOKP2',
});

export const claimantSolicitorBulkScanUser: User = getUser({
  name: 'Claimant Solicitor Bulk Scan',
  email: 'hmcts.civil+organisation.1.solicitor.2@gmail.com',
  password: config.users.defaultPassword,
  key: UserKey.CLAIMANT_SOLICITOR_BULK_SCAN,
  role: UserRole.CASEWORKER,
  orgId: config.environment === Environment.DEMO ? 'B04IXE4' : 'Q1KOKP2',
});

export const claimantOrganisationSuperUser: User = getUser({
  name: 'Claimant Organisation Super',
  email: 'hmcts.civil+organisation.1.superuser@gmail.com',
  password: config.users.defaultPassword,
  key: UserKey.CLAIMANT_ORGANISATION_SUPER,
  role: UserRole.CASEWORKER,
  orgId: config.environment === Environment.DEMO ? 'B04IXE4' : 'Q1KOKP2',
});

export const defendantSolicitor1User: User = getUser({
  name: 'Defendant Solicitor 1',
  email: 'hmcts.civil+organisation.2.solicitor.1@gmail.com',
  password: config.users.defaultPassword,
  key: UserKey.DEFENDANT_SOLICITOR_1,
  role: UserRole.CASEWORKER,
  orgId: process.env.ENVIRONMENT === Environment.DEMO ? 'DAWY9LJ' : '79ZRSOU',
});

export const defendantSolicitor2User: User = getUser({
  name: 'Defendant Solicitor 2',
  email: 'hmcts.civil+organisation.3.solicitor.1@gmail.com',
  password: config.users.defaultPassword,
  key: UserKey.DEFENDANT_SOLICITOR_2,
  role: UserRole.CASEWORKER,
  orgId: process.env.ENVIRONMENT === Environment.DEMO ? 'LCVTI1I' : 'H2156A0',
});

export const otherSolicitorUser1: User = getUser({
  name: 'Other Solicitor 1',
  email: 'civil.damages.claims+organisation.1.solicitor.1@gmail.com',
  password: config.users.defaultPassword,
  key: UserKey.OTHER_SOLICITOR_1,
  role: UserRole.CASEWORKER,
  orgId: process.env.ENVIRONMENT === Environment.DEMO ? 'OZO586V' : '0FA7S8S',
});

export const otherSolicitorUser2: User = getUser({
  name: 'Other Solicitor 2',
  email: 'civil.damages.claims+organisation.2.solicitor.1@gmail.com',
  password: config.users.defaultPassword,
  key: UserKey.OTHER_SOLICITOR_2,
  role: UserRole.CASEWORKER,
  orgId: process.env.ENVIRONMENT === Environment.DEMO ? 'DOSS3I2' : 'N5AFUXG',
});

export const otherSolicitorUser3: User = getUser({
  name: 'Other Solicitor 3',
  email: 'hmcts.civil+organisation.1.solicitor.2@gmail.com',
  password: config.users.defaultPassword,
  key: UserKey.OTHER_SOLICITOR_3,
  role: UserRole.CASEWORKER,
  orgId: process.env.ENVIRONMENT === Environment.DEMO ? 'B04IXE4' : 'Q1KOKP2',
});

export const civilAdminUser: User = getUser({
  name: 'Civil Admin',
  email: 'civil-admin@mailnesia.com',
  password: config.users.defaultPassword,
  key: UserKey.CIVIL_ADMIN,
  role: UserRole.CASEWORKER,
});

export const nbcRegion1User: User = getUser({
  name: 'NBC Region 1',
  email: 'nbc_admin_region1@justice.gov.uk',
  password: config.users.defaultPassword,
  key: UserKey.NBC_REGION_1,
  role: UserRole.CASEWORKER,
  wa: true,
});

export const nbcRegion2User: User = getUser({
  name: 'NBC Region 2',
  email: 'nbc_admin_region2@justice.gov.uk',
  password: config.users.defaultPassword,
  key: UserKey.NBC_REGION_2,
  role: UserRole.CASEWORKER,
  wa: true,
});

export const nbcRegion4User: User = getUser({
  name: 'NBC Region 4',
  email: 'nbc_admin_region4@justice.gov.uk',
  password: config.users.defaultPassword,
  key: UserKey.NBC_REGION_4,
  role: UserRole.CASEWORKER,
  wa: true,
});

export const nbcLocalUser: User = getUser({
  name: 'NBC Local',
  email: 'nbc-team-leader@mailnesia.com',
  password: config.users.defaultPassword,
  key: UserKey.NBC_LOCAL,
  role: UserRole.CASEWORKER,
  wa: true,
});

export const judgeRegion1User: User = getUser({
  name: 'Judge Region 1',
  email: '4917924EMP-@ejudiciary.net',
  password: config.users.judgeDefaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.JUDGE_REGION_1,
  wa: true,
});

export const judgeRegion2User: User = getUser({
  name: 'Judge Region 2',
  email: 'EMP42506@ejudiciary.net',
  password: config.users.judgeDefaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.JUDGE_REGION_2,
  wa: true,
});

export const judgeRegion4User: User = getUser({
  name: 'Judge Region 4',
  email: '4924246EMP-@ejudiciary.net',
  password: config.users.judgeDefaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.JUDGE_REGION_4,
  wa: true,
});

export const hearingCenterAdminLocalUser: User = getUser({
  name: 'Hearing Center Admin Local',
  email: 'hearing-centre-admin-01@example.com',
  password: config.users.defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.HEARING_CENTER_ADMIN_LOCAL,
  wa: true,
});

export const hearingCenterAdminRegion1User: User = getUser({
  name: 'Hearing Center Admin Region 1',
  email: 'hearing_center_admin_reg1@justice.gov.uk',
  password: config.users.defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.HEARING_CENTER_ADMIN_REGION_1,
  wa: true,
});

export const hearingCenterAdminRegion2User: User = getUser({
  name: 'Hearing Center Admin Region 2',
  email: 'hearing_center_admin_reg2@justice.gov.uk',
  password: config.users.defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.HEARING_CENTER_ADMIN_REGION_2,
  wa: true,
});

export const hearingCenterAdminRegion4User: User = getUser({
  name: 'Hearing Center Admin Region 4',
  email: 'hearing_center_admin_reg4@justice.gov.uk',
  password: config.users.defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.HEARING_CENTER_ADMIN_REGION_4,
  wa: true,
});

export const tribunalCaseworkerRegion1User: User = getUser({
  name: 'Tribunal Legal Caseworker Region 1',
  email: 'tribunal_legal_caseworker_reg1@justice.gov.uk',
  password: config.users.defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.TRIBUNAL_CASEWORKER_REGION_1,
  wa: true,
});

export const tribunalCaseworkerRegion4User: User = getUser({
  name: 'Tribunal Legal Caseworker Region 4',
  email: 'tribunal_legal_caseworker_reg4@justice.gov.uk',
  password: config.users.defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.TRIBUNAL_CASEWORKER_REGION_4,
  wa: true,
});

export const ctscAdminUser: User = getUser({
  name: 'CTSC Admin',
  email: 'ctsc_admin@justice.gov.uk',
  password: config.users.defaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.CTSC_ADMIN,
  wa: true,
});

export const civilSystemUpdate: User = getUser({
  name: 'Civil System Update',
  email: 'civil-system-update@mailnesia.com',
  password: config.users.systemUserDefaultPassword,
  role: UserRole.CASEWORKER,
  key: UserKey.CIVIL_SYSTEM_UPDATE,
});

export const solicitorUsers = [
  claimantSolicitorUser,
  claimantSolicitorBulkScanUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
];

export const exuiAuthSetupUsers = [
  claimantSolicitorUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
  civilAdminUser,
  judgeRegion1User,
];

export const exuiUserDataSetupUsers = [
  claimantSolicitorUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
  civilAdminUser,
  ctscAdminUser,
  judgeRegion1User,
  judgeRegion4User,
  hearingCenterAdminRegion1User,
  hearingCenterAdminRegion4User,
  civilSystemUpdate,
];

const exuiUsers = {
  claimantSolicitorUser,
  claimantSolicitorBulkScanUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
  civilAdminUser,
  nbcRegion1User,
  nbcRegion2User,
  nbcRegion4User,
  judgeRegion1User,
  judgeRegion2User,
  judgeRegion4User,
  hearingCenterAdminRegion1User,
  hearingCenterAdminRegion2User,
  hearingCenterAdminRegion4User,
  tribunalCaseworkerRegion4User,
  ctscAdminUser,
};

export default exuiUsers;
