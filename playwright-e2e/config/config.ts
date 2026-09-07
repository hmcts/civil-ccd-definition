import * as dotenv from 'dotenv'
import Environment from '../constants/test-utils/environment';
import testSpeeds from '../constants/test-utils/test-speeds';
import { TestSpeed } from '../models/test-utils/test-speeds';
import CaseType from '../constants/cases/case-type';

dotenv.config({path: '.env.tests.local'})

const config = {
  environment: process.env.ENVIRONMENT as Environment,
  idamStudEnabled: process.env.IDAM_STUB_ENABLED === 'true',
  runExuiAuthSetup: process.env.PLAYWRIGHT_RUN_EXUI_AUTH_SETUP === 'true',
  runCuiUserSetup: process.env.PLAYWRIGHT_RUN_CUI_USER_SETUP === 'true',
  runExuiUserDataSetup: process.env.PLAYWRIGHT_RUN_EXUI_USER_DATA_SETUP === 'true',
  runCuiUserDataSetup: process.env.PLAYWRIGHT_RUN_CUI_USER_DATA_SETUP === 'true',
  runDataSetup: process.env.PLAYWRIGHT_RUN_DATA_SETUP === 'true',
  runAxeTests: process.env.PLAYWRIGHT_RUN_ACCESSIBILITY_TESTS === 'true',
  unassignCases: process.env.PLAYWRIGHT_UNASSIGN_CASES === 'true',
  debugCaseId: parseInt(process.env.PLAYWRIGHT_DEBUG_CASE_ID),
  gaDebugCaseId: parseInt(process.env.PLAYWRIGHT_GA_DEBUG_CASE_ID),
  waEnabled: process.env.PLAYWRIGHT_WA_ENABLED === 'true',
  s2s: {
    microservice: 'civil_service',
    secret: process.env.S2S_SECRET || 'AABBCCDDEEFFGGHH',
  },
  s2sForXUI: {
    microservice: 'xui_webapp',
    secret: process.env.XUI_S2S_SECRET || 'AABBCCDDEEFFGGHH',
  },
  definition: {
    jurisdiction: 'CIVIL',
    caseType: CaseType.CIVIL,
    caseTypeGA: CaseType.GA,
  },
  playwright: {
    softExpect: process.env.PLAYWRIGHT_UI_SOFT_EXPECT === 'true',
    toPassTimeout: 25_000,
    workers: parseInt(process.env.PLAYWRIGHT_WORKERS),
    actionTimeout: 25_000,
    showBrowserWindow: process.env.PLAYWRIGHT_SHOW_BROWSER_WINDOW === 'true',
    retries: parseInt(process.env.PLAYWRIGHT_RETRIES),
    testSpeed: testSpeeds[process.env.PLAYWRIGHT_TEST_SPEED.toUpperCase() as string] as TestSpeed,
    shortExpectTimeout: 20_000,
    functionalTestResultsDir: process.env.PLAYWRIGHT_FUNCTIONAL_TEST_RESULTS_DIR &&
      process.env.PLAYWRIGHT_FUNCTIONAL_TEST_RESULTS_PROJECT_DIR
      ? `${process.env.PLAYWRIGHT_FUNCTIONAL_TEST_RESULTS_DIR}/${process.env.PLAYWRIGHT_FUNCTIONAL_TEST_RESULTS_PROJECT_DIR}`
      : './playwright-test-results',
  },
  exui: {
    eventRetries: parseInt(process.env.PLAYWRIGHT_EXUI_RETRIES),
    pageSubmitTimeout: 45_000,
  },
  idam: {
    eventRetries: parseInt(process.env.PLAYWRIGHT_IDAM_RETRIES),
    pageSubmitTimeout: 30_000
  },
  users: {
    defaultPassword: process.env.DEFAULT_PASSWORD,
    iacDefaultPassword: process.env.IAC_DEFAULT_PASSWORD,
    judgeDefaultPassword: process.env.JUDGE_DEFAULT_PASSWORD,
    systemUserDefaultPassword: process.env.SYSTEM_USER_PASSWORD,
    claimantCitizenEmail: process.env.CLAIMANT_CITIZEN_EMAIL,
    defendantCitizenEmail: process.env.DEFENDANT_CITIZEN_EMAIL,

  }
};

export default config;
