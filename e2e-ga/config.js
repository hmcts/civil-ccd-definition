const defaultPassword = process.env.DEFAULT_PASSWORD;
const judgePassword = process.env.JUDGE_DEFAULT_PASSWORD;
const iacDefaultPassword = process.env.IAC_DEFAULT_PASSWORD;

module.exports = {
  idamStub: {
    enabled: process.env.IDAM_STUB_ENABLED || false,
    url: 'http://localhost:5555'
  },
  url: {
    manageCase: process.env.URL || 'http://localhost:3333',
    authProviderApi: process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL || 'http://localhost:4502',
    ccdDataStore: process.env.CCD_DATA_STORE_URL || 'http://localhost:4452',
    dmStore: process.env.DM_STORE_URL || 'http://dm-store:8080',
    idamApi: process.env.IDAM_API_URL || 'http://localhost:5000',
    civilService: process.env.CIVIL_SERVICE_URL || 'http://localhost:4000',
    generalApplication: process.env.CIVIL_SERVICE_URL || 'http://localhost:4550',
    waTaskMgmtApi: process.env.WA_TASK_MGMT_URL || 'http://wa-task-management-api-aat.service.core-compute-aat.internal'

    // aat url's
    /*manageCase:  'https://manage-case.aat.platform.hmcts.net',
    authProviderApi: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    ccdDataStore: 'http://ccd-data-store-api-aat.service.core-compute-aat.internal',
    dmStore:'http://dm-store-aat.service.core-compute-aat.internal',
    idamApi: 'https://idam-api.aat.platform.hmcts.net',
    civilService: 'http://civil-service-aat.service.core-compute-aat.internal',
    waTaskMgmtApi: 'http://wa-task-management-api-aat.service.core-compute-aat.internal',
    generalApplication: 'http://civil-general-applications-aat.service.core-compute-aat.internal'*/

    // preview url's
   /* manageCase: 'https://xui-civil-ga-ccd-pr-787.preview.platform.hmcts.net',
    authProviderApi: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    ccdDataStore: 'https://ccd-data-store-api-civil-ga-ccd-pr-787.preview.platform.hmcts.net',
    dmStore: 'http://dm-store-aat.service.core-compute-aat.internal',
    idamApi:  'https://idam-api.aat.platform.hmcts.net',
    civilService: 'https://civil-service-civil-ga-ccd-pr-787.preview.platform.hmcts.net',
    generalApplication: 'https://civil-ga-ccd-pr-787.preview.platform.hmcts.net'*/

    // wa demo url's
    /* manageCase:  'https://manage-case.demo.platform.hmcts.net',
     authProviderApi: 'http://rpe-service-auth-provider-demo.service.core-compute-demo.internal',
     ccdDataStore: 'http://ccd-data-store-api-demo.service.core-compute-demo.internal',
     dmStore:'http://dm-store-demo.service.core-compute-demo.internal',
     idamApi: 'https://idam-api.demo.platform.hmcts.net',
     civilService: 'http://civil-service-demo.service.core-compute-demo.internal',
     waTaskMgmtApi: 'http://wa-task-management-api-demo.service.core-compute-demo.internal',
     generalApplication: 'http://civil-general-applications-demo.service.core-compute-demo.internal'*/
  },
  s2s: {
    microservice: 'civil_service',
    secret: process.env.S2S_SECRET || 'AABBCCDDEEFFGGHH'
  },
  s2sForXUI: {
    microservice: 'xui_webapp',
    secret: process.env.XUI_S2S_SECRET || 'AABBCCDDEEFFGGHH'
  },
  judgeLocalUser: {
    password: defaultPassword,
    email: '4924246EMP-@ejudiciary.net',
    type: 'judge',
    roleCategory: 'JUDICIAL',
    regionId: '4'
  },
  judgeUser2WithRegionId2: {
    password: judgePassword,
    email: 'EMP42506@ejudiciary.net',
    type: 'judge',
    roleCategory: 'JUDICIAL',
    regionId: '2'
  },
  judgeUserWithRegionId1Local: {
    password: defaultPassword,
    email: 'judge-civil-02@example.com',
    type: 'judge',
    roleCategory: 'JUDICIAL',
    regionId: '1'
  },
  judgeUser: {
    password: judgePassword,
    email: '4924246EMP-@ejudiciary.net',
    type: 'judge',
    roleCategory: 'JUDICIAL',
    regionId: '4'
  },
  applicantSolicitorUser: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.1.solicitor.1@gmail.com',
    type: 'applicant_solicitor',
    orgId: process.env.ENVIRONMENT === 'demo' ? 'B04IXE4' : 'Q1KOKP2'
  },
  defendantCitizenUser1: {
    password: defaultPassword,
    email: 'civilmoneyclaimsdemo@gmail.com',
    type: 'defendant',
  },
  defendantCitizenUser2: {
    password: defaultPassword,
    email: `citizen.${new Date().getTime()}.${Math.random()}.user@gmail.com`,
    type: 'defendant',
  },
  defendantSolicitorUser: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.2.solicitor.1@gmail.com',
    type: 'defendant_solicitor',
    orgId: process.env.ENVIRONMENT === 'demo' ? 'DAWY9LJ' : '79ZRSOU'
  },
  secondDefendantSolicitorUser: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.3.solicitor.1@gmail.com',
    type: 'defendant_solicitor',
    orgId: process.env.ENVIRONMENT === 'demo' ? 'LCVTI1I' : 'H2156A0'
  },
  judgeUserWithRegionId1: {
    password: judgePassword,
    email: '4917924EMP-@ejudiciary.net',
    type: 'judge',
    roleCategory: 'JUDICIAL',
    regionId: '1'
  },
  judgeUserWithRegionId4: {
    password: judgePassword,
    email: '4925359EMP-@ejudiciary.net',
    type: 'judge',
    roleCategory: 'JUDICIAL',
    regionId: '4'
  },
  hearingCenterAdminWithRegionId1: {
    email: 'hearing_center_admin_reg1@justice.gov.uk',
    password: defaultPassword,
    type: 'hearing-center-admin',
    roleCategory: 'ADMIN',
    regionId: '1'
  },
  hearingCenterAdminLocal: {
    email: 'hearing-centre-admin-01@example.com',
    password: defaultPassword,
    type: 'hearing-center-admin',
    roleCategory: 'ADMIN'
  },
  hearingCenterAdminRegion4: {
    email: 'hearing_center_admin_region4@justice.gov.uk',
    password: defaultPassword,
    type: 'hearing-center-admin',
    roleCategory: 'ADMIN'
  },
  hearingCenterAdminWithRegionId2: {
    email: 'hearing_center_admin_reg2@justice.gov.uk',
    password: defaultPassword,
    type: 'hearing-center-admin',
    roleCategory: 'ADMIN',
    regionId: '2'
  },
  tribunalCaseworkerWithRegionId4: {
    email: 'tribunal_legal_caseworker_reg4@justice.gov.uk',
    password: defaultPassword,
    type: 'tribunal-caseworker',
    roleCategory: 'LEGAL_OPERATIONS',
    regionId: '4'
  },
  tribunalCaseworkerWithRegionId2: {
    email: 'tribunal_legal_caseworker_reg2@justice.gov.uk',
    password: defaultPassword,
    type: 'tribunal-caseworker',
    roleCategory: 'LEGAL_OPERATIONS',
    regionId: '2'
  },
  tribunalCaseworkerWithRegionId: {
    email: 'tribunal_legal_caseworker_national@justice.gov.uk',
    password: defaultPassword,
    type: 'tribunal-caseworker',
    roleCategory: 'LEGAL_OPERATIONS',
    regionId: '1'
  },
  nbcAdminWithRegionId4: {
    email: 'nbc_admin_region4@justice.gov.uk',
    password: defaultPassword,
    type: 'national-business-centre',
    roleCategory: 'ADMIN',
    regionId: '4'
  },
  nbcAdminWithRegionId1: {
    email: 'nbc_admin_region1@justice.gov.uk',
    password: defaultPassword,
    type: 'national-business-centre',
    roleCategory: 'ADMIN',
    regionId: '1'
  },
  nbcAdminWithRegionId2: {
    password: defaultPassword,
    email: 'nbc_admin_region2@justice.gov.uk',
    type: 'national-business-centre',
    roleCategory: 'ADMIN',
    regionId: '1'
  },
  ctscAdmin: {
    password: defaultPassword,
    email: 'ga_ctsc_team_leader_national@justice.gov.uk',
    type: 'national-business-centre',
    roleCategory: 'ADMIN'
  },
  adminUser: {
    password: defaultPassword,
    email: 'civil-admin@mailnesia.com',
    type: 'admin'
  },
  definition: {
    jurisdiction: 'CIVIL',
    caseType: 'CIVIL',
    caseTypeGA: 'GENERALAPPLICATION'
  },
  iacLeadershipJudge: {
    password: judgePassword,
    email: '330127EMP-@ejudiciary.net',
    type: 'judge',
    roleCategory: 'JUDICIAL'
  },
  iacLegalOpsUser: {
    password: iacDefaultPassword,
    email: 'CRD_func_test_demo_stcwuser1@justice.gov.uk',
    type: 'legalOps',
    roleCategory: 'LEGAL_OPERATIONS'
  },
  iacAdminUser: {
    password: iacDefaultPassword,
    email: 'CRD_func_test_demo_adm21@justice.gov.uk',
    type: 'admin',
    roleCategory: 'ADMIN'
  },

  nbcTeamLead: {
    password: defaultPassword,
    email: 'nbc_team_leader_region4@justice.gov.uk',
    type: 'admin',
    roleCategory: 'ADMIN'
  },
  srTribunalCaseworker: {
    password: defaultPassword,
    email: 'sr_tribunal_caseworker_region4@justice.gov.uk',
    type: 'LEGAL_OPERATIONS',
    roleCategory: 'LEGAL_OPERATIONS'
  },
  leaderShipJudge: {
    password: judgePassword,
    email: 'EMP47622@ejudiciary.net',
    type: 'JUDICIAL',
    roleCategory: 'JUDICIAL'
  },
  applicantCitizenUser: {
    password: defaultPassword,
    email: 'civilmoneyclaimsdemo@gmail.com',
    type: 'claimant',
  },
  systemUpdate: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.1.superuser@gmail.com',
    type: 'systemupdate'
  },
  waTaskIds: {
    nbcUserReviewGA: 'ReviewApplication',
    judgeDecideOnApplication: 'JudgeDecideOnApplication',
    legalAdvisorDecideOnApplication: 'LegalAdvisorDecideOnApplication',
    scheduleApplicationHearing: 'ScheduleApplicationHearing',
    reviewApplicationOrder: 'ReviewApplicationOrder',
    judgeRevisitApplication: 'JudgeRevisitApplication',
    reviewRevisitedApplication: 'ReviewRevisitedApplication',
    legalAdvisorRevisitApplication: 'LegalAdvisorRevisitApplication',
    reviewSpecificAccessRequestJudiciary: 'reviewSpecificAccessRequestJudiciary',
    reviewSpecificAccessRequestLegalOps: 'reviewSpecificAccessRequestLegalOps',
    reviewSpecificAccessRequestAdmin: 'reviewSpecificAccessRequestAdmin',
  },
  TestOutputDir: process.env.E2E_OUTPUT_DIR || 'test-results/functional',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',
  runningEnv: process.env.ENVIRONMENT,
  runWAApiTest: process.env.RUN_WA_API_TEST === 'true' || false,
  claimantSolicitorOrgId: process.env.ENVIRONMENT === 'demo' ? 'B04IXE4' : 'Q1KOKP2',
  defendant1SolicitorOrgId: process.env.ENVIRONMENT === 'demo' ? 'DAWY9LJ' : '79ZRSOU',
  defendant2SolicitorOrgId: process.env.ENVIRONMENT === 'demo' ? 'LCVTI1I' : 'H2156A0',
  claimantSelectedCourt: 'Nottingham County Court And Family Court - Canal Street - NG1 7EJ',
  defendantSelectedCourt: 'Nottingham County Court And Family Court - Canal Street - NG1 7EJ',
  defendant2SelectedCourt: 'Nottingham County Court And Family Court - Canal Street - NG1 7EJ',
  claimantSelectedCourtBirmingham: 'Birmingham Civil and Family Justice Centre - Priory Courts, 33 Bull Street - B4 6DS',
  defendantSelectedCourtBirmingham: 'Birmingham Civil and Family Justice Centre - Priory Courts, 33 Bull Street - B4 6DS',
};
