/* eslint-disable no-console */

const supportedBrowsers = require('./e2e-ga/crossbrowser/supportedBrowsers.js');
const testConfig = require('./e2e-ga/config');

const browser = process.env.SAUCELABS_BROWSER || 'chrome';
const defaultSauceOptions = {
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
  acceptSslCerts: true,
  pageLoadStrategy: 'normal',
  idleTimeout: 700,
  tags: ['Civil GA'],
};

function merge(intoObject, fromObject) {
  return Object.assign({}, intoObject, fromObject);
}

function getBrowserConfig(browserGroup) {
  const browserConfig = [];
  for (const candidateBrowser in supportedBrowsers[browserGroup]) {
    if (candidateBrowser) {
      const candidateCapabilities = supportedBrowsers[browserGroup][candidateBrowser];
      candidateCapabilities['sauce:options'] = merge(
        defaultSauceOptions, candidateCapabilities['sauce:options']
      );
      browserConfig.push({
        browser: candidateCapabilities.browserName,
        capabilities: candidateCapabilities,
      });
    } else {
      console.error('ERROR: supportedBrowsers.js is empty or incorrectly defined');
    }
  }
  return browserConfig;
}

const setupConfig = {
  tests: './e2e-ga/tests/**/*_test.js',
  output: `${process.cwd()}/${testConfig.TestOutputDir}`,
  helpers: {
    WebDriver: {
      url: testConfig.url.manageCase,
      browser,
      waitForTimeout: 90000,
      smartWait: 90000,
      cssSelectorsEnabled: 'true',
      chromeOptions: {
        args: [
          'start-maximized',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--no-sandbox',
          'disable-infobars',
          'ignore-gpu-blacklist',
        ],
      },
      acceptInsecureCerts: true,
      sauceSeleniumAddress: 'ondemand.eu-central-1.saucelabs.com:443/wd/hub',
      host: 'ondemand.eu-central-1.saucelabs.com',
      port: 80,
      region: 'eu',
      sauceConnect: true,
      supportedBrowsers,
      capabilities: {},
    },
    BrowserHelpers: {
      require: './e2e-ga/helpers/browser_helper.js',
    },
    GenerateReportHelper: {
      require: './e2e-ga/helpers/generate_report_helper.js'
    },
    SauceLabsReportingHelper: {
      require: './e2e-ga/helpers/sauce_labs_reporting_helper.js',
    },
    WebDriverHelper: {
      require: './e2e-ga/helpers/WebDriverHelper.js'
    },
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2,
    },
    autoDelay: {
      enabled: true,
      methods: [
        'click',
        'fillField',
        'checkOption',
        'selectOption',
        'attachFile',
      ],
      delayAfter: 5000,
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: 'true'
    }
  },
  include: {
    I: './e2e-ga/steps_file.js',
    api: './e2e-ga/api/steps.js',
  },
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          steps: true
        },
      },
      'mocha-junit-reporter': {
        stdout: '-',
        options: {mochaFile: `${testConfig.TestOutputDir}/result.xml`},
      },
      mochawesome: {
        stdout: testConfig.TestOutputDir + '/console.log',
        options: {
          reportDir: testConfig.TestOutputDir,
          reportName: 'index',
          reportTitle: 'Crossbrowser results for: ' + browser.toUpperCase(),
          inlineAssets: true,
        },
      },
    },
  },
  multiple: {
    edge: {
      browsers: getBrowserConfig('edge'),
    },
    chrome: {
      browsers: getBrowserConfig('chrome'),
    },
    firefox: {
      browsers: getBrowserConfig('firefox'),
    },
    safari: {
      browsers: getBrowserConfig('safari'),
    },
  },
  name: 'Civil GA Cross-Browser Tests',
};

exports.config = setupConfig;
