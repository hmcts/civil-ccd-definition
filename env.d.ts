declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CI: string;
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
      WA_TASK_MGMT_URL: string;
      AAC_API_URL: string;
      CIVIL_ORCHESTRATOR_SERVICE_URL: string;
      PAYMENT_API_URL: string;
      WIRE_MOCK_SERVICE_URL: string;
      DEFAULT_PASSWORD: string;
      JUDGE_DEFAULT_PASSWORD: string;
      IAC_DEFAULT_PASSWORD: string;
      SYSTEM_USER_PASSWORD: string;
      PLAYWRIGHT_SHOW_BROWSER_WINDOW: string;
      PLAYWRIGHT_UI_SOFT_EXPECT: string;
      IDAM_STUB_ENABLED: string;
      PLAYWRIGHT_RUN_ACCESSIBILITY_TESTS: string;
      S2S_SECRET: string;
      XUI_S2S_SECRET: string;
      PLAYWRIGHT_RUN_SETUP: string;
      PLAYWRIGHT_UNASSIGN_CASES: string;
      PLAYWRIGHT_TEST_SPEED: string;
      PLAYWRIGHT_RETRIES: string;
      PLAYWRIGHT_EXUI_RETRIES: string;
      PLAYWRIGHT_DEBUG_CASE_ID: string;
    }
  }
}

export {};
