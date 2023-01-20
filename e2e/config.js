const defaultPassword = 'Password12!';
const judgeDefaultPassword = 'Hmcts1234';

module.exports = {
  idamStub: {
    enabled: process.env.IDAM_STUB_ENABLED || false,
    url: 'http://localhost:5555'
  },
  url: {
    // manageCase: process.env.URL || 'https://manage-case-wa-int.demo.platform.hmcts.net',
    // authProviderApi: process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL || 'http://rpe-service-auth-provider-demo.service.core-compute-demo.internal',
    // ccdDataStore: process.env.CCD_DATA_STORE_URL || 'http://ccd-data-store-api-demo.service.core-compute-demo.internal',
    // dmStore:process.env.DM_STORE_URL || 'http://dm-store-demo.service.core-compute-demo.internal',
    // idamApi: process.env.IDAM_API_URL || 'https://idam-api.demo.platform.hmcts.net',
    // civilService: process.env.CIVIL_SERVICE_URL || 'http://civil-service-demo.service.core-compute-demo.internal',
    // waTaskMgmtApi: process.env.WA_TASK_MGMT_URL || 'http://wa-task-management-api-demo.service.core-compute-demo.internal'

    manageCase: 'https://xui-civil-ccd-pr-1745.preview.platform.hmcts.net',
    authProviderApi:'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    ccdDataStore: 'https://ccd-data-store-api-civil-ccd-pr-1745.preview.platform.hmcts.net',
    dmStore: 'http://dm-store-aat.service.core-compute-aat.internal',
    idamApi: 'https://idam-api.aat.platform.hmcts.net',
    civilService: 'https://civil-service-pr-1843.preview.platform.hmcts.net',
    waTaskMgmtApi: 'http://wa-task-management-api-aat.service.core-compute-aat.internal'

    // manageCase: process.env.URL || 'http://localhost:3333',
    // authProviderApi: process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL || 'http://localhost:4502',
    // ccdDataStore: process.env.CCD_DATA_STORE_URL || 'http://localhost:4452',
    // dmStore: process.env.DM_STORE_URL || 'http://dm-store:8080',
    // idamApi: process.env.IDAM_API_URL || 'http://localhost:5000',
    // civilService: process.env.CIVIL_SERVICE_URL || 'http://localhost:4000',
    // generalApplication: process.env.CIVIL_GENERAL_APPLICATIONS_URL  || 'http://localhost:4550',
    // waTaskMgmtApi: process.env.WA_TASK_MGMT_URL || 'http://wa-task-management-api-aat.service.core-compute-aat.internal'
  },
  s2s: {
    microservice: 'civil_service',
    secret: process.env.S2S_SECRET || 'AABBCCDDEEFFGGHH'
  },
  s2sForXUI: {
    microservice: 'xui_webapp',
    secret: process.env.XUI_S2S_SECRET || 'AABBCCDDEEFFGGHH'
  },
  applicantSolicitorUser: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.1.solicitor.1@gmail.com',
    type: 'applicant_solicitor'
  },
  defendantSolicitorUser: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.2.solicitor.1@gmail.com',
    type: 'defendant_solicitor'
  },
  secondDefendantSolicitorUser: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.3.solicitor.1@gmail.com',
    type: 'defendant_solicitor'
  },
  adminUser: {
    password: defaultPassword,
    email: 'civil-admin@mailnesia.com',
    type: 'admin'
  },
  judgeUserWithRegionId1: {
    password: judgeDefaultPassword,
    email: '4917924EMP-@ejudiciary.net',
    type: 'judge',
    roleCategory: 'JUDICIAL',
    regionId: '1'
  },
  judgeUserWithRegionId1Local: {
    password: defaultPassword,
    email: 'judge-civil-02@example.com',
    type: 'judge',
    roleCategory: 'JUDICIAL',
    regionId: '1'
  },
  judgeUserWithRegionId2: {
    password: judgeDefaultPassword,
    email: '4915631EMP-@ejudiciary.net',
    type: 'judge',
    roleCategory: 'JUDICIAL',
    regionId: '2'
  },
  hearingCenterAdminWithRegionId1: {
    email: 'hearing_center_admin_reg1@justice.gov.uk',
    password: defaultPassword,
    type: 'hearing-center-admin',
    roleCategory: 'ADMIN',
    regionId: '1'
  },
  hearingCenterAdminWithRegionId4: {
    email: 'hearing_center_admin_region4@justice.gov.uk',
    password: defaultPassword,
    type: 'hearing-center-admin',
    roleCategory: 'ADMIN',
    regionId: '4'
  },
  hearingCenterAdminWithRegionId12: {
    email: 'CIVIL_WA_func_test_demo_user9@justice.gov.uk',
    password: defaultPassword,
    type: 'hearing-center-admin',
    roleCategory: 'ADMIN',
    regionId: '12'
  },
  tribunalCaseworkerWithRegionId12: {
    email: 'CIVIL_WA_func_test_demo_user7@justice.gov.uk',
    password: defaultPassword,
    type: 'tribunal-caseworker',
    roleCategory: 'LEGAL_OPERATIONS',
    regionId: '12'
  },
  tribunalCaseworkerWithRegionId1: {
    email: 'tribunal_caseworker_region4@justice.gov.uk',
    password: defaultPassword,
    type: 'tribunal-caseworker',
    roleCategory: 'LEGAL_OPERATIONS',
    regionId: '1'
  },
  tribunalCaseworkerWithRegionId1Local: {
    email: 'tribunal-caseworker-01@example.com',
    password: defaultPassword,
    type: 'tribunal-caseworker',
    roleCategory: 'LEGAL_OPERATIONS',
    regionId: '1'
  },
  systemupdate: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.1.superuser@gmail.com',
    type: 'systemupdate'
  },
  definition: {
    jurisdiction: 'CIVIL',
    caseType: 'CIVIL',
  },
  waTaskIds: {
    judgeUnspecDJTask :'summaryJudgmentDirections',
    listingOfficerCaseProgressionTask: 'transferCaseOffline',
  },
  TestOutputDir: process.env.E2E_OUTPUT_DIR || 'test-results/functional',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',
  runningEnv: process.env.ENVIRONMENT,
  runWAApiTest: process.env.RUN_WA_API_TEST == 'true' || false,
  claimantSolicitorOrgId: process.env.ENVIRONMENT == 'demo' ? 'B04IXE4' : 'Q1KOKP2',
  defendant1SolicitorOrgId: process.env.ENVIRONMENT == 'demo' ? 'DAWY9LJ' : '79ZRSOU',
  defendant2SolicitorOrgId: process.env.ENVIRONMENT == 'demo' ? 'LCVTI1I' : 'H2156A0',
  claimantSelectedCourt:'Central London County Court - THOMAS MORE BUILDING, ROYAL COURTS OF JUSTICE, STRAND, LONDON - WC2A 2LL',
  defendantSelectedCourt:'Central London County Court - THOMAS MORE BUILDING, ROYAL COURTS OF JUSTICE, STRAND, LONDON - WC2A 2LL',
  defendant2SelectedCourt: 'Barnet Civil and Family Centre - ST MARY\'S COURT, REGENTS PARK ROAD - N3 1BQ',
  djClaimantSelectedCourt:'Central London County Court - THOMAS MORE BUILDING, ROYAL COURTS OF JUSTICE, STRAND, LONDON - WC2A 2LL',
  djJudgeClaimantSelectedCourt:'Liverpool Civil and Family Court - 35, VERNON STREET, CITY SQUARE - L2 2BX',
  sdoJudgeSelectedCourt:'Central London County Court - THOMAS MORE BUILDING, ROYAL COURTS OF JUSTICE, STRAND, LONDON - WC2A 2LL'
};
