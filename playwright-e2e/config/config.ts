import * as dotenv from 'dotenv'
import Environment from '../constants/test-utils/environment';
import testSpeeds from '../constants/test-utils/test-speeds';
import { TestSpeed } from '../models/test-utils/test-speeds';

dotenv.config({path: '.env.tests.local'})

const config = {
  environment: process.env.ENVIRONMENT as Environment,
  idamStudEnabled: process.env.IDAM_STUB_ENABLED === 'true',
  runExuiAuthSetup: process.env.PLAYWRIGHT_RUN_EXUI_AUTH_SETUP === 'true',
  runCuiUserSetup: process.env.PLAYWRIGHT_RUN_CUI_USER_SETUP === 'true',
  runUserDataSetup: process.env.PLAYWRIGHT_RUN_USER_DATA_SETUP === 'true',
  runDataSetup: process.env.PLAYWRIGHT_RUN_DATA_SETUP === 'true',
  runAxeTests: process.env.PLAYWRIGHT_RUN_ACCESSIBILITY_TESTS === 'true',
  unassignCases: process.env.PLAYWRIGHT_UNASSIGN_CASES === 'true',
  debugCaseId: parseInt(process.env.PLAYWRIGHT_DEBUG_CASE_ID),
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
    caseType: 'CIVIL',
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
  },
  exui: {
    eventRetries: parseInt(process.env.PLAYWRIGHT_EXUI_RETRIES),
    pageSubmitTimeout: 45_000,
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
