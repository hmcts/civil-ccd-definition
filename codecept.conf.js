const {
  createFailedTestFile,
  createNewFailedTestsFile,
  deleteNewFailedTestsFile,
} = require('./e2e/plugins/failedTestFilesPlugin');

const ccdPipelineTests = process.env.FAILED_TEST_FILES
  ? process.env.FAILED_TEST_FILES.split(',')
  : [
      './e2e/tests/ui_tests/*.js',
      './e2e/tests/ui_tests/damages/*_test.js',
      './e2e/tests/ui_tests/lrspec/*_test.js',
      './e2e/tests/ui_tests/damages/nightly/*_test.js',
      './e2e/tests/ui_tests/noticeofchange/*_test.js',
      './e2e/tests/ui_tests/manageContactInformation/*_test.js',
      './e2e/tests/ui_tests/settle_discontinue/*_test.js',
      './e2e/tests/ui_tests/sdo/*_test.js',
      './e2e/tests/ui_tests/carm/*_test.js',
      './e2e/tests/ui_tests/minti/*_test.js',
      './e2e/tests/ui_tests/refunds/*_test.js',
      './e2e/tests/ui_tests/default_judgement/*_test.js',
      './e2e/tests/ui_tests/hearings/*_test.js',
      './e2e/tests/api_tests/lrspec_cui/*_test.js',
    ];
const civilServiceAndCamundaTests = [
  './e2e/tests/api_tests/*.js',
  './e2e/tests/api_tests/judgmentOnline/*_test.js',
  './e2e/tests/api_tests/mediation/*_test.js',
  './e2e/tests/api_tests/sdo_R2/*_test.js',
  './e2e/tests/api_tests/generalapplication/*_test.js',
  './e2e/tests/api_tests/defaultJudgments/*_test.js',
  './e2e/tests/api_tests/damages/*_test.js',
  './e2e/tests/api_tests/sdo/*_test.js',
  './e2e/tests/api_tests/hearings/*_test.js',
  './e2e/tests/api_tests/bulkclaim/*_test.js',
  './e2e/tests/api_tests/lrspec/*_test.js',
  './e2e/tests/api_tests/lrspec_cui/*_test.js',
  './e2e/tests/api_tests/settle-discontinue/*_test.js',
  './e2e/tests/api_tests/multiIntermediateTrack/*_test.js',
  './e2e/tests/api_tests/settle-discontinue/*_test.js',
  './e2e/tests/api_tests/automated_hearing_notice/*_test.js',
  './e2e/tests/api_tests/caseworkerEvents/*_test.js',
];
exports.config = {
  bootstrapAll: async () => {
    await createNewFailedTestsFile();
  },
  teardownAll: async () => {
    await createFailedTestFile();
    await deleteNewFailedTestsFile();
  },
  tests:
    process.env.WA_TESTS === 'true'
      ? [...ccdPipelineTests, ...civilServiceAndCamundaTests]
      : process.env.CCD_UI_TESTS === 'true'
        ? ccdPipelineTests
        : civilServiceAndCamundaTests,
  output: process.env.REPORT_DIR || 'test-results/functional',
  helpers: {
    Playwright: {
      url: process.env.URL || 'http://localhost:3333',
      show: process.env.SHOW_BROWSER_WINDOW === 'true' || false,
      waitForTimeout: parseInt(process.env.WAIT_FOR_TIMEOUT_MS || 90000),
      windowSize: '1280x960',
      browser: 'chromium',
      timeout: 20000,
      waitForAction: 500,
      bypassCSP: true,
      ignoreHTTPSErrors: true,
      video: true,
      contextOptions: {
        recordVideo: {
          dir: 'failed-videos',
        },
      },
    },
    BrowserHelpers: {
      require: './e2e/helpers/browser_helper.js',
    },
    GenerateReportHelper: {
      require: './e2e/helpers/generate_report_helper.js',
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
    bulks: './e2e/api/steps_Bulk.js',
  },
  plugins: {
    autoDelay: {
      enabled: true,
      methods: ['click', 'fillField', 'checkOption', 'selectOption', 'attach'],
    },
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
    failedTestFilesPlugin: {
      enabled: true,
      require: './e2e/plugins/failedTestFilesPlugin'
    }
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
      mochawesome: {
        stdout: '-',
        options: {
          reportDir: process.env.REPORT_DIR || 'test-results/functional',
          reportFilename: `${process.env.MOCHAWESOME_REPORTFILENAME + '-' + new Date().getTime()}`,
          inlineAssets: true,
          overwrite: false,
          json: false,
        },
      },
    },
  },
};
