const { testFilesHelper } = require("./e2e-ga/plugins/failedAndNotExecutedTestFilesPlugin");

const functional = process.env.FUNCTIONAL;

const getTests = () => {
  let prevFailedTestFiles = process.env.PREV_FAILED_TEST_FILES;
  let prevNotExecutedTestFiles = process.env.PREV_NOT_EXECUTED_TEST_FILES;

  if (prevFailedTestFiles !== undefined || prevNotExecutedTestFiles !== undefined) {
    prevFailedTestFiles = prevFailedTestFiles ? prevFailedTestFiles.split(',') : [];
    prevNotExecutedTestFiles = prevNotExecutedTestFiles ? prevNotExecutedTestFiles.split(',') : [];
    return [...prevFailedTestFiles, ...prevNotExecutedTestFiles];
  }

  if (process.env.CCD_UI_TESTS === "true")
    return [
      './e2e-ga/tests/ui_tests/{*,**/*}_test.js',
      './e2e-ga/tests/api_tests/{*,**/*}_test.js',
      './e2e-ga/tests/ga_smoke_test.js',
    ];

  return [
    './e2e-ga/tests/api_tests/{*,**/*}_test.js',
    './e2e-ga/tests/ga_smoke_test.js',
  ];
};

exports.config = {
  bootstrapAll: async () => {
    if (functional) {
      await testFilesHelper.createTempFailedTestsFile();
      await testFilesHelper.createTempPassedTestsFile();
      await testFilesHelper.createTempToBeExecutedTestsFile();
    }
  },
  teardownAll: async () => {
    if (functional) {
      await testFilesHelper.createTestFilesReport();
      await testFilesHelper.deleteTempFailedTestsFile();
      await testFilesHelper.deleteTempPassedTestsFile();
      await testFilesHelper.deleteTempToBeExecutedTestFiles();
    }
  },
  tests: getTests(),
  output: process.env.REPORT_DIR || "test-results/functional",
  helpers: {
    Playwright: {
      url: process.env.URL || "http://localhost:3333",
      show: process.env.SHOW_BROWSER_WINDOW === "true" || false,
      waitForAction: 500,
      waitForTimeout: parseInt(process.env.WAIT_FOR_TIMEOUT_MS || 90000),
      windowSize: "1280x960",
      browser: "chromium",
      timeout: 20000,
      bypassCSP: true,
      ignoreHTTPSErrors: true,
    },
    BrowserHelpers: {
      require: "./e2e-ga/helpers/browser_helper.js",
    },
    PlaywrightHelper: {
      require: "./e2e-ga/helpers/PlaywrightHelper.js",
    },
    GenerateReportHelper: {
      require: "./e2e-ga/helpers/generate_report_helper.js",
    },
  },
  include: {
    I: "./e2e-ga/steps_file.js",
    api: "./e2e-ga/api/steps.js",
    api_sdo: "./e2e-ga/api/steps_SDO.js",
    wa: "./e2e-ga/steps_file_WA.js",
  },
  plugins: {
    autoDelay: {
      enabled: true,
      methods: ["click", "fillField", "checkOption", "selectOption", "attachFile"],
    },
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
    tryTo: {
      enabled: true,
    },
    failedAndNotExecutedTestFilesPlugin: {
      enabled: functional,
      require: "./e2e-ga/plugins/failedAndNotExecutedTestFilesPlugin",
    },
    allure: {
      enabled: true,
      require: "allure-codeceptjs",
      resultsDir: `${process.env.REPORT_DIR || 'test-results/functional-ga'}/allure-results`,
    },
  },
  mocha: {
    bail: process.env.PROCEED_ON_FAILURE !== "true",
    reporterOptions: {
      "codeceptjs-cli-reporter": {
        stdout: "-",
        options: {
          steps: false,
        },
      },
      "mocha-junit-reporter": {
        stdout: "-",
        options: {
          mochaFile: process.env.REPORT_FILE || "test-results/functional/result.xml",
        },
      },
      mochawesome: {
        stdout: "-",
        options: {
          reportDir: process.env.REPORT_DIR || "test-results/functional",
          reportFilename: `${process.env.MOCHAWESOME_REPORTFILENAME + "-" + new Date().getTime()}`,
          inlineAssets: true,
          overwrite: false,
          json: false,
        },
      },
    },
  },
};
