exports.config = {
  tests: [
    './e2e/tests/*_test.js',
    './e2e/tests/api_tests/defaultJudgments/*_test.js',
    './e2e/tests/api_tests/damages/*_test.js',
    './e2e/tests/api_tests/lrspec_cui/*_test.js',
    './e2e/tests/api_tests/sdo/*_test.js',
    './e2e/tests/ui_tests/damages/*_test.js',
    './e2e/tests/ui_tests/damages/nightly/*_test.js',
    './e2e/tests/ui_tests/lrspec/*_test.js',
    './e2e/tests/ui_tests/noticeofchange/*_test.js',
    './e2e/tests/api_tests/lrspec/*_test.js',
    './e2e/tests/ui_tests/sdo/*_test.js',
    './e2e/tests/ui_tests/default_judgement/*_test.js',
    './e2e/tests/api_tests/hearings/*_test.js',
    './e2e/tests/api_tests/bulkclaim/*_test.js',
    './e2e/tests/ui_tests/hearings/*_test.js',
    './e2e/tests/api_tests/judgmentOnline/*_test.js',
    './e2e/tests/api_tests/sdo_R2/*_test.js'
  ],
  output: 'test-results/functional',
  helpers: {
    Puppeteer: {
      restart: false,
      keepCookies: true,
      show: process.env.SHOW_BROWSER_WINDOW === 'true' || false,
      windowSize: '1200x900',
      waitForTimeout: parseInt(process.env.WAIT_FOR_TIMEOUT_MS || 90000),
      chrome: {
        ignoreHTTPSErrors: true
      },
    },
    BrowserHelpers: {
      require: './e2e/helpers/browser_helper.js',
    },
    GenerateReportHelper: {
      require: './e2e/helpers/generate_report_helper.js'
    },
  },
  include: {
    I: './e2e/steps_file.js',
    LRspec: './e2e/steps_file_LRspec.js',
    WA: './e2e/steps_file_WA.js',
    api: './e2e/api/steps.js',
    api_spec: './e2e/api/steps_LRspec.js',
    api_spec_fast: './e2e/api/steps_LRspecFast.js',
    api_spec_small: './e2e/api/steps_LRspecSmall.js',
    api_spec_cui: './e2e/api/steps_LRspecCui.js',
    noc: './e2e/api/steps_noc.js',
    hearings: './e2e/api/steps_hearings.js',
    bulks: './e2e/api/steps_Bulk.js'
  },
  plugins: {
    autoDelay: {
      enabled: true,
      methods: [
        'click',
        'fillField',
        'checkOption',
        'selectOption',
        'attachFile',
      ],
    },
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
  },
  mocha: {
    bail: true,
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          steps: false,
        },
      },
      'mocha-junit-reporter': {
        stdout: '-',
        options: {
          mochaFile: process.env.REPORT_FILE || 'test-results/functional/result.xml',
        },
      },
      'mochawesome': {
        stdout: '-',
        options: {
          reportDir: process.env.REPORT_DIR || 'test-results/functional',
          reportFilename: `${process.env.MOCHAWESOME_REPORTFILENAME+'-'+new Date().getTime()}`,
          inlineAssets: true,
          overwrite: false,
          json: false,
        },
      },
    }
  }
};
