const defaultPassword = 'Password12!';

module.exports = {
  idamStub: {
    enabled: process.env.IDAM_STUB_ENABLED || false,
    url: 'http://localhost:5555'
  },
  url: {
    manageCase: process.env.URL || 'https://xui-civil-ccd-pr-360.service.core-compute-preview.internal',
    authProviderApi: process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL || 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    ccdDataStore: process.env.CCD_DATA_STORE_URL || 'http://ccd-data-store-api-aat.service.core-compute-aat.internal',
    dmStore: process.env.DM_STORE_URL || 'http://dm-store-aat.service.core-compute-aat.internal',
    idamApi: process.env.IDAM_API_URL || 'https://idam-api.aat.platform.hmcts.net',
    civilService: process.env.CIVIL_SERVICE_URL || 'http://civil-ccd-pr-360.service.core-compute-preview.internal',
  },
  s2s: {
    microservice: 'civil_service',
    secret: process.env.S2S_SECRET || 'AABBCCDDEEFFGGHH'
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
    email: 'hmcts.civil+organisation.2.solicitor.2@gmail.com',
    type: 'defendant_solicitor'
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
  multipartyTestsEnabled: process.env.MULTIPARTY_TESTS_ENABLED === 'true'
};
