const defaultPassword = 'Password12!';
const judgeDefaultPassword = 'Hmcts1234';
const iacDefaultPassword = 'AldgateT0wer';

module.exports = {
  idamStub: {
    enabled: process.env.IDAM_STUB_ENABLED === 'true',
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

    manageCase: process.env.URL || 'http://localhost:3333',
    authProviderApi: process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL || 'http://localhost:4502',
    ccdDataStore: process.env.CCD_DATA_STORE_URL || 'http://localhost:4452',
    dmStore: process.env.DM_STORE_URL || 'http://dm-store:8080',
    idamApi: process.env.IDAM_API_URL || 'http://localhost:5000',
    civilService: process.env.CIVIL_SERVICE_URL || 'http://localhost:4000',
    generalApplication: process.env.CIVIL_GENERAL_APPLICATIONS_URL  || 'http://localhost:4550',
    waTaskMgmtApi: process.env.WA_TASK_MGMT_URL || 'http://wa-task-management-api-aat.service.core-compute-aat.internal',
    caseAssignmentService: process.env.AAC_API_URL || 'http://localhost:4454',
    //----------------------------------------------------------------------------------------------
    wiremockService: 'http://localhost:8765'
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
    type: 'applicant_solicitor',
    orgId: process.env.ENVIRONMENT === 'demo' ? 'B04IXE4' : 'Q1KOKP2'
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
  otherSolicitorUser1: {
    password: defaultPassword,
    email: 'civil.damages.claims+organisation.1.solicitor.1@gmail.com',
    type: 'defendant_solicitor',
    orgId: process.env.ENVIRONMENT === 'demo' ? 'OZO586V' : '0FA7S8S'
  },
  otherSolicitorUser2: {
    password: defaultPassword,
    email: 'civil.damages.claims+organisation.2.solicitor.1@gmail.com',
    type: 'defendant_solicitor',
    orgId: process.env.ENVIRONMENT === 'demo' ? 'DOSS3I2' : 'N5AFUXG'
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
  judgeUserWithRegionId4: {
    password: judgeDefaultPassword,
    email: '4924159EMP-@ejudiciary.net',
    type: 'judge',
    roleCategory: 'JUDICIAL',
    regionId: '4'
  },
  judgeUser2WithRegionId4: {
    password: judgeDefaultPassword,
    email: '4924246EMP-@ejudiciary.net',
    type: 'judge',
    roleCategory: 'JUDICIAL',
    regionId: '4'
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
  hearingCenterAdminLocal: {
    email: 'hearing-centre-admin-01@example.com',
    password: defaultPassword,
    type: 'hearing-center-admin',
    roleCategory: 'ADMIN',
    regionId: '1'
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
  tribunalCaseworkerWithRegionId4: {
    email: 'tribunal_legal_caseworker_reg4@justice.gov.uk',
    password: defaultPassword,
    type: 'tribunal-caseworker',
    roleCategory: 'LEGAL_OPERATIONS',
    regionId: '1'
  },
  ctscAdminUser: {
    email: 'ctsc_admin@justice.gov.uk',
    password: defaultPassword,
    type: 'tribunal-caseworker',
    roleCategory: 'CTSC',
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
    jurisdiction: 'CIVIL_NIGHTLY',
    caseType: 'CIVIL',
  },
  iacLeadershipJudge: {
    password: iacDefaultPassword,
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
  iacCtscTeamLeaderUser: {
    email: 'CRD_func_test_demo_ctsc_tl@justice.gov.uk',
    password: iacDefaultPassword,
    type: 'ctsc-team-leader',
    roleCategory: 'CTSC',
    regionId: 'none'
  },
  iacAdminUser: {
    password: iacDefaultPassword,
    email: 'CRD_func_test_demo_adm21@justice.gov.uk',
    type: 'admin',
    roleCategory: 'ADMIN'
  },
  iacAATAdminUser: {
    password: iacDefaultPassword,
    email: '	crd_func_test_aat_adm22@justice.gov.uk  ',
    type: 'admin',
    roleCategory: 'ADMIN'
  },
  nbcTeamLeaderWithRegionId4: {
    email: 'nbc_team_leader_region4@justice.gov.uk',
    password: defaultPassword,
    type: 'nbc-team-leader',
    roleCategory: 'NBC ADMIN',
    regionId: '4'
  },
  nbcTeamLeaderWithRegionId1: {
    email: 'nbc_team_lead_reg1@justice.gov.uk',
    password: defaultPassword,
    type: 'nbc-team-leader',
    roleCategory: 'NBC ADMIN',
    regionId: '1'
  },
  seniorTBCWWithRegionId4: {
    email: 'seniorcivil_tbcw_region4@justice.gov.uk',
    password: defaultPassword,
    type: 'senior-tribunal-caseworker',
    roleCategory: 'LEGAL_OPS',
    regionId: '4'
  },
  ctscTeamLeaderUser: {
    email: 'ctsc_team_leader_region4@justice.gov.uk',
    password: defaultPassword,
    type: 'hmcts-ctsc',
    roleCategory: 'CTSC',
    regionId: 'none'
  },
  staffUIAdmin: {
    email: 'staff-ui-admin@justice.gov.uk',
    password: defaultPassword,
    type: 'staff-admin',
    roleCategory: 'cwd-admin',
    regionId: 'none'
  },
  feePaidJudge: {
    email: '49932114EMP-@ejudiciary.net',
    password: judgeDefaultPassword,
    type: 'judge',
    roleCategory: 'JUDICIAL'
  },
  waTaskIds: {
    judgeUnspecDJTask :'summaryJudgmentDirections',
    listingOfficerCaseProgressionTask: 'transferCaseOffline',
    reviewSpecificAccessRequestJudiciary: 'reviewSpecificAccessRequestJudiciary',
    reviewSpecificAccessRequestLegalOps: 'reviewSpecificAccessRequestLegalOps',
    reviewSpecificAccessRequestAdmin: 'reviewSpecificAccessRequestAdmin',
    reviewSpecificAccessRequestCTSC: 'reviewSpecificAccessRequestCTSC',
    fastTrackDirections: 'FastTrackDirections',
    smallClaimDirections: 'SmallClaimsTrackDirections',
    legalAdvisorDirections: 'LegalAdvisorSmallClaimsTrackDirections',
    notSuitableSdo: 'transferCaseOfflineNotSuitableSDO'
  },
  TestOutputDir: process.env.E2E_OUTPUT_DIR || 'test-results/functional',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',
  runningEnv: process.env.ENVIRONMENT,
  runWAApiTest: process.env.RUN_WA_API_TEST == 'true' || false,
  claimantSolicitorOrgId: process.env.ENVIRONMENT === 'demo' ? 'B04IXE4' : 'Q1KOKP2',
  defendant1SolicitorOrgId: process.env.ENVIRONMENT === 'demo' ? 'DAWY9LJ' : '79ZRSOU',
  defendant2SolicitorOrgId: process.env.ENVIRONMENT === 'demo' ? 'LCVTI1I' : 'H2156A0',
  claimantSelectedCourt:'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ',
  defendantSelectedCourt:'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ',
  defendant2SelectedCourt: 'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ',
  djClaimantSelectedCourt:'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ',
  liverpoolCourt:'Liverpool Civil and Family Court - 35, Vernon Street, City Square - L2 2BX',
  sdoJudgeSelectedCourt:'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ',
  localNoCTests: false
};
