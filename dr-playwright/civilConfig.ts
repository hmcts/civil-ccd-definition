import User from '../playwright-e2e/models/user.ts';
import { getUser } from '../playwright-e2e/config/users/user-utils.ts';
import UserKey from '../playwright-e2e/enums/user-key.ts';
import UserRole from '../playwright-e2e/enums/user-role.ts';
import config from '../playwright-e2e/config/config.ts';
import Environment from '../playwright-e2e/enums/environment.ts';
// Password12!
const defaultPassword = process.env.DEFAULT_PASSWORD;
const eventCode = process.env.CLAIM == 'SPEC' ? '_SPEC' : '';
environment: process.env.ENVIRONMENT as Environment

export const envUrl: string = process.env.URL;
export const idamApiBaseUrl: string = process.env.IDAM_API_URL;
export const authProviderApiBaseUrl: string = process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL;
export const ccdDataStoreApiBaseUrl: string = process.env.CCD_DATA_STORE_URL;
export const documentManagementStoreApiBaseUrl: string = process.env.DM_STORE_URL;
export const microService: string = 'civil_service';
export const civilServiceUrl: string = process.env.CIVIL_SERVICE_URL;
export const secret: string = process.env.S2S_SECRET;

export const createCase = {
  jurisdictionCode: 'CIVIL',
  caseTypeCode: 'Civil',
  eventCode: 'CREATE_CLAIM' + eventCode
}

export const createCaseTest = (caseType) => {
  return {
    jurisdictionCode: 'CIVIL',
    caseTypeCode: 'Civil',
    eventCode: 'CREATE_CLAIM' + caseType == 'SPEC' ? '_SPEC' : ''
  }
}


export const claimantSolicitorCredentials = {
  name: 'Claimant Solicitor',
  username: 'hmcts.civil+organisation.1.solicitor.1@gmail.com',
  password: defaultPassword,
 // key: UserKey.CLAIMANT_SOLICITOR,
 // role: UserRole.CASEWORKER,
  orgId: config.environment === Environment.DEMO ? 'B04IXE4' : 'Q1KOKP2',
}

export const respondent1SolicitorCredentials = {
  name: 'Respondent1 Solicitor',
  username: 'hmcts.civil+organisation.2.solicitor.1@gmail.com',
  password: defaultPassword,
  // key: UserKey.CLAIMANT_SOLICITOR,
  // role: UserRole.CASEWORKER,
  orgId: process.env.ENVIRONMENT === 'demo' ? 'DAWY9LJ' : '79ZRSOU'
}

export const respondent2SolicitorCredentials = {
  name: 'Respondent2 Solicitor',
  username: 'hmcts.civil+organisation.3.solicitor.1@gmail.com',
  password: defaultPassword,
  // key: UserKey.CLAIMANT_SOLICITOR,
  // role: UserRole.CASEWORKER,
  orgId: process.env.ENVIRONMENT === 'demo' ? 'LCVTI1I' : 'H2156A0'
}

export const systemupdate = {
  username: 'hmcts.civil+organisation.1.superuser@gmail.com',
  password: defaultPassword,
  type: 'systemupdate'
}

export const apiRetries = {
  intervals: [1000, 2500, 5000, 10000, 15000, 20000, 30000, 40000, 50000, 55000, 65000, 80000, 90000, 100000,115000],
  timeout: 120000
}

