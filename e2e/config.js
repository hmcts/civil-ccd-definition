const defaultPassword = 'Password12!';

module.exports = {
  idamStub: {
    enabled: process.env.IDAM_STUB_ENABLED || false,
    url: 'http://localhost:5555'
  },
  url: {
    manageCase: process.env.URL || 'https://xui-civil-ccd-staging.service.core-compute-preview.internal',
    authProviderApi: process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL || 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    ccdDataStore: process.env.CCD_DATA_STORE_URL || ' https://civil-ccd-data-store-staging-aat.service.core-compute-aat.internal',
    dmStore: process.env.DM_STORE_URL || ' http://dm-store-aat.service.core-compute-aat.internal',
    idamApi: process.env.IDAM_API_URL || 'https://idam-api.aat.platform.hmcts.net',
    civilService: process.env.CIVIL_SERVICE_URL || 'https://civil-ccd-staging.service.core-compute-aat.internal',

  },
  s2s: {
    microservice: 'civil_service',
    secret: process.env.S2S_SECRET || 'BTZQFPGY4TUMAFGL'
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
  systemupdate: {
    password: defaultPassword,
    email: 'hmcts.civil+organisation.1.superuser@gmail.com',
    type: 'systemupdate'
  },
  definition: {
    jurisdiction: 'CIVIL',
    caseType: 'CIVIL',
  },
  TestOutputDir: process.env.E2E_OUTPUT_DIR || 'test-results/functional',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',
  runningEnv: process.env.ENVIRONMENT,
  claimantSolicitorOrgId: process.env.ENVIRONMENT == 'demo' ? 'B04IXE4' : 'Q1KOKP2',
  defendant1SolicitorOrgId: process.env.ENVIRONMENT == 'demo' ? 'DAWY9LJ' : '79ZRSOU',
  defendant2SolicitorOrgId: process.env.ENVIRONMENT == 'demo' ? 'LCVTI1I' : 'H2156A0',
};
