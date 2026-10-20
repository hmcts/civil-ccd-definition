import config from '../playwright-e2e/config/config.ts';
import Environment from '../playwright-e2e/constants/test-utils/environment.ts';
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
// The fees register civil-service looks fees up in, and the payment service fees are paid through. Each environment has
// its own, except a preview, which uses AAT's (PREVIEW_FEES_API_URL in Jenkinsfile_CNP). Override with FEES_REGISTER_URL
// and PAYMENT_API_URL.
const feesEnvironment = ['demo', 'ithc', 'perftest'].includes(process.env.ENVIRONMENT) ? process.env.ENVIRONMENT : 'aat';
export const feesRegisterApiBaseUrl: string = process.env.FEES_REGISTER_URL
  ?? `http://fees-register-api-${feesEnvironment}.service.core-compute-${feesEnvironment}.internal`;
export const paymentApiBaseUrl: string = process.env.PAYMENT_API_URL
  ?? `http://payment-api-${feesEnvironment}.service.core-compute-${feesEnvironment}.internal`;

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

// Region 1 (London) judge, which covers the Clerkenwell court the claims are issued at. Judges see cases through their
// region's role assignment, so they are not assigned to the case.
export const judgeCredentials = {
  name: 'Judge',
  username: 'DJ.Amy.Powell@ejudiciary.net',
  password: process.env.JUDGE_DEFAULT_PASSWORD,
}

// Region 1 (London) hearing centre admin, who lists hearings at the Clerkenwell court the claims are issued at. Like the
// judge, they see cases through their region's role assignment rather than being assigned to the case.
export const hearingCentreAdminCredentials = {
  name: 'Hearing Centre Admin',
  username: 'hearing_center_admin_reg1@justice.gov.uk',
  password: defaultPassword,
}

export const systemupdate = {
  username: 'hmcts.civil+organisation.1.superuser@gmail.com',
  password: defaultPassword,
  type: 'systemupdate'
}

export const apiRetries = {
  intervals: [1000, 2500, 5000],
  timeout: 120000
}

// How hard to try when XUI is slow to load: how many attempts (the first load plus reloads or retries),
// and how many seconds to wait on each attempt. Override with XUI_LOAD_ATTEMPTS and XUI_LOAD_WAIT_SECONDS.
export const xuiLoadRetries = {
  attempts: Number(process.env.XUI_LOAD_ATTEMPTS ?? 3),
  waitSeconds: Number(process.env.XUI_LOAD_WAIT_SECONDS ?? 20),
}

// How hard to try when CCD is slow, or briefly fails, to check an event page after Continue: how many attempts in
// total, how many seconds to wait before retrying, how many seconds to wait for CCD to respond, and how many seconds
// without anything being sent to CCD before a click on Continue counts as dropped. Override with
// CONTINUE_RETRY_ATTEMPTS, CONTINUE_RETRY_WAIT_SECONDS, CONTINUE_RESPONSE_TIMEOUT_SECONDS and
// CONTINUE_DROPPED_CLICK_SECONDS.
export const continueRetries = {
  attempts: Number(process.env.CONTINUE_RETRY_ATTEMPTS ?? 3),
  waitSeconds: Number(process.env.CONTINUE_RETRY_WAIT_SECONDS ?? 10),
  responseTimeoutSeconds: Number(process.env.CONTINUE_RESPONSE_TIMEOUT_SECONDS ?? 60),
  droppedClickSeconds: Number(process.env.CONTINUE_DROPPED_CLICK_SECONDS ?? 10),
}

// How many seconds to wait for the payment result page, which can be slow when the payment service is busy.
// Override with PAYMENT_RESULT_WAIT_SECONDS.
export const paymentResultWaitSeconds = Number(process.env.PAYMENT_RESULT_WAIT_SECONDS ?? 60);

// How many cases to unassign from a user in one call at teardown. The case IDs go in a request URL, so large
// numbers of cases are sent in batches to stay within URL length limits. Override with UNASSIGN_BATCH_SIZE.
// keepAssignments leaves the solicitors assigned to the cases created during the run, for example to carry on with a
// case by hand afterwards. Set KEEP_CASE_ASSIGNMENTS=Yes.
export const caseUnassignment = {
  batchSize: Number(process.env.UNASSIGN_BATCH_SIZE ?? 50),
  keepAssignments: process.env.KEEP_CASE_ASSIGNMENTS === 'Yes',
}

// Work allocation (WA) on a preview built with the pr-values:fullDeployment label, which has its own Camunda and WA
// task monitor. Their addresses follow the XUI one (xui-civil-citizen-ui-pr-8265... becomes
// camunda-civil-citizen-ui-pr-8265...). Override with CAMUNDA_URL and WA_TASK_MONITOR_URL. waitSeconds is how long
// to wait for Camunda to create a task (override with WA_TASK_WAIT_SECONDS).
const previewHost = (prefix: string) => (envUrl ?? '').replace('://xui-', `://${prefix}-`);
export const workAllocation = {
  camundaUrl: process.env.CAMUNDA_URL ?? `${previewHost('camunda')}/engine-rest`,
  taskMonitorUrl: process.env.WA_TASK_MONITOR_URL ?? previewHost('wa-task-monitor'),
  waitSeconds: Number(process.env.WA_TASK_WAIT_SECONDS ?? 60),
}

// How hard to try when the document store rate limits an upload: how many attempts in total, and the wait before
// the first retry in seconds. Each later retry waits longer (wait x attempt number), so the defaults of 5 attempts
// and 5 seconds wait up to 50 seconds in all. Override with UPLOAD_RETRY_ATTEMPTS and UPLOAD_RETRY_WAIT_SECONDS.
export const uploadRetries = {
  attempts: Number(process.env.UPLOAD_RETRY_ATTEMPTS ?? 5),
  waitSeconds: Number(process.env.UPLOAD_RETRY_WAIT_SECONDS ?? 5),
}

