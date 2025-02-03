import 'dotenv/config';
import Environment from '../enums/environment';

const config = {
  environment: process.env.ENVIRONMENT as Environment,
  idamStudEnabled: process.env.IDAM_STUB_ENABLED === 'true',
  runSetup: process.env.PLAYWRIGHT_RUN_SETUP === 'true',
  runAxeTests: process.env.PLAYWRIGHT_RUN_ACCESSIBILITY_TESTS === 'true',
  unassignCases: process.env.PLAYWRIGHT_UNASSIGN_CASES === 'true',
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
    caseType: 'CIVIL' + (process.env.CCD_DEF_VERSION || ''),
  },
  playwright: {
    softExpect: process.env.PLAYWRIGHT_UI_SOFT_EXPECT === 'true',
    toPassTimeout: 25_000,
    workers: parseInt(process.env.PLAYWRIGHT_WORKERS),
    actionTimeout: 25_000,
    showBrowserWindow: process.env.PLAYWRIGHT_SHOW_BROWSER_WINDOW === 'true',
    retries: process.env.PLAYWRIGHT_RETRIES ? parseInt(process.env.PLAYWRIGHT_RETRIES) : undefined,
  },
};

export default config;
