const defaultPassword = 'Password12!';

module.exports = {
  idamStub: {
    enabled: process.env.IDAM_STUB_ENABLED || false,
    url: 'http://localhost:5555'
  },
  url: {
    // manageCase: process.env.URL || 'https://manage-case-int.demo.platform.hmcts.net/',
    // authProviderApi: process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL || 'http://rpe-service-auth-provider-demo.service.core-compute-demo.internal',
    // ccdDataStore: process.env.CCD_DATA_STORE_URL || 'http://ccd-data-store-api-demo.service.core-compute-demo.internal',
    // dmStore:process.env.DM_STORE_URL || 'http://dm-store-demo.service.core-compute-demo.internal',
    // idamApi: process.env.IDAM_API_URL || 'https://idam-api.demo.platform.hmcts.net',
    // civilService: process.env.CIVIL_SERVICE_URL || 'http://civil-service-demo.service.core-compute-demo.internal'
    manageCase: process.env.URL || 'http://localhost:3333',
    authProviderApi: process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL || 'http://localhost:4502',
    ccdDataStore: process.env.CCD_DATA_STORE_URL || 'http://localhost:4452',
    dmStore: process.env.DM_STORE_URL || 'http://dm-store:8080',
    idamApi: process.env.IDAM_API_URL || 'http://localhost:5000',
    civilService: process.env.CIVIL_SERVICE_URL || 'http://localhost:4000',
    //ToDo: create new process env for caseAssignmentService and ensure it exists across environments
    caseAssignmentService: 'http://localhost:4454',
    //----------------------------------------------------------------------------------------------
    wiremockService: 'http://localhost:8765'
  },
  s2s: {
    microservice: 'civil_service',
    secret: process.env.S2S_SECRET || 'AABBCCDDEEFFGGHH'
  },
  applicantSolicitorUser: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.1.solicitor.1@gmail.com',
    type: 'applicant_solicitor',
    orgId: process.env.ENVIRONMENT == 'demo' ? 'B04IXE4' : 'Q1KOKP2'
  },
  defendantSolicitorUser: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.2.solicitor.1@gmail.com',
    type: 'defendant_solicitor',
    orgId: process.env.ENVIRONMENT == 'demo' ? 'DAWY9LJ' : '79ZRSOU'
  },
  secondDefendantSolicitorUser: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.3.solicitor.1@gmail.com',
    type: 'defendant_solicitor',
    orgId: process.env.ENVIRONMENT == 'demo' ? 'LCVTI1I' : 'H2156A0'
  },
  otherSolicitorUser1: {
    password: defaultPassword,
    email: 'civil.damages.claims+organisation.1.solicitor.1@gmail.com',
    type: 'defendant_solicitor',
    orgId: process.env.ENVIRONMENT == 'demo' ? 'OZO586V' : '0FA7S8S'
  },
  otherSolicitorUser2: {
    password: defaultPassword,
    email: 'civil.damages.claims+organisation.2.solicitor.1@gmail.com',
    type: 'defendant_solicitor',
    orgId: process.env.ENVIRONMENT == 'demo' ? 'DOSS3I2' : 'N5AFUXG'
  },
  adminUser: {
    password: defaultPassword,
    email: 'civil-admin@mailnesia.com',
    type: 'admin'
  },
  definition: {
    jurisdiction: 'CIVIL',
    caseType: 'CIVIL',
  },
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './output',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',

  //ToDo: Update civil-sdk to process.env.ENVIRONMENT to 'local' ??
  runningEnv: process.env.ENVIRONMENT,

  //ToDo: Replace with with noc toggle code which exists in master branch
  nocEnabled: true,
  //---------------------------------------------------------------------

  idamTokenLoggingEnabled: true
};
