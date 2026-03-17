import User from '../playwright-e2e/models/user.ts';
import { getUser } from '../playwright-e2e/config/users/user-utils.ts';
import UserKey from '../playwright-e2e/enums/user-key.ts';
import UserRole from '../playwright-e2e/enums/user-role.ts';
import config from '../playwright-e2e/config/config.ts';
import Environment from '../playwright-e2e/enums/environment.ts';
// Password12!
const defaultPassword = process.env.DEFAULT_PASSWORD;

environment: process.env.ENVIRONMENT as Environment

export const envUrl: string = process.env.ENVIRONMENT === 'preview' ? 'https://xui-ia-case-api-pr-3056.preview.platform.hmcts.net' : (process.env.ENVIRONMENT === 'demo' ? 'https://manage-case.demo.platform.hmcts.net' : 'https://manage-case.aat.platform.hmcts.net');


export const createCaseUnspecified = {
  jurisdictionCode: 'CIVIL',
  caseTypeCode: 'Civil',
  eventCode: 'CREATE_CLAIM',
}

export const createCaseSpecified = {
  jurisdictionCode: 'CIVIL',
  caseTypeCode: 'Civil',
  eventCode: 'CREATE_CLAIM_SPEC',
}


export const claimantSolicitorCredentials = {
  name: 'Claimant Solicitor',
  username: 'hmcts.civil+organisation.1.solicitor.1@gmail.com',
  password: defaultPassword,
 // key: UserKey.CLAIMANT_SOLICITOR,
 // role: UserRole.CASEWORKER,
  orgId: config.environment === Environment.DEMO ? 'B04IXE4' : 'Q1KOKP2',
}
