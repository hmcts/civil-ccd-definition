import 'dotenv/config';
import '../enums/environment'
import Environment from '../enums/environment';

const config = {
  environment: Environment[process.env.ENVIRONMENT] as Environment,
  s2s: {
    microservice: 'civil_service',
    secret: process.env.S2S_SECRET || 'AABBCCDDEEFFGGHH'
  },
  s2sForXUI: {
    microservice: 'xui_webapp',
    secret: process.env.XUI_S2S_SECRET || 'AABBCCDDEEFFGGHH'
  },
  playwright: {
    softExpect: process.env.UI_SOFT_EXPECT === 'true',
    toPassTimeout: 25_000,
    workers: 5,
    actionTimeout: 25_000,
    showBrowserWindow: process.env.SHOW_BROWSER_WINDOW === 'true',
  },
}

export default config;