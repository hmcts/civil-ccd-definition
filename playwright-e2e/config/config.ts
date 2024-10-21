import 'dotenv/config';
import Environment from '../enums/environment';

const config = {
  environment: Environment[process.env.ENVIRONMENT] as Environment,
  idamStudEnabled: process.env.IDAM_STUB_ENABLED === 'true',
  runSetup: process.env.RUN_SETUP === 'true',
  runAxeTests: process.env.RUN_ACCESSIBILITY_TESTS === 'true',
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
    softExpect: process.env.UI_SOFT_EXPECT === 'true',
    toPassTimeout: 25_000,
    workers: 5,
    actionTimeout: 25_000,
    showBrowserWindow: process.env.SHOW_BROWSER_WINDOW === 'true',
  },
};

export default config;
