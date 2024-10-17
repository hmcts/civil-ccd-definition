declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CI: string;
      CCD_UI_TESTS: string;
      FUNCTIONAL: string;
      PLAYWRIGHT_WORKERS: string;
      ENVIRONMENT: string;
      URL: string;
      SERVICE_AUTH_PROVIDER_API_BASE_URL: string;
      CCD_DATA_STORE_URL: string;
      DM_STORE_URL: string;
      IDAM_WEB_URL: string;
      IDAM_API_URL: string;
      CIVIL_SERVICE_URL: string;
      CIVIL_GENERAL_APPLICATIONS_URL: string;
      WA_TASK_MGMT_URL: string;
      AAC_API_URL: string;
      CIVIL_ORCHESTRATOR_SERVICE_URL: string;
      PAYMENT_API_URL: string;
      WIRE_MOCK_SERVICE_URL: string;
      DEFAULT_PASSWORD: string;
      JUDGE_DEFAULT_PASSWORD: string;
      IAC_DEFAULT_PASSWORD: string;
      SYSTEM_USER_PASSWORD: string;
      SHOW_BROWSER_WINDOW: string;
      UI_SOFT_EXPECT: string;
      IDAM_STUB_ENABLED: string;
      RUN_ACCESSIBILITY_TESTS: string;
      S2S_SECRET: string;
      XUI_S2S_SECRET: string;
      RUN_SETUP: string;
    }
  }
}

export {};
