const { Workers, event } = require('codeceptjs');

const splitTests = () => {
  const files = [
    [
      './e2e/tests/ui_tests/damages/*_test.js',
      './e2e/tests/api_tests/damages/*_test.js'
    ],
    [
      './e2e/tests/ui_tests/lrspec/*_test.js',
      './e2e/tests/api_tests/lrspec/*_test.js'
    ],
    [
      './e2e/tests/ui_tests/default_judgement/*_test.js',
      './e2e/tests/api_tests/defaultJudgments/*_test.js'
    ],
    [
      './e2e/tests/ui_tests/noticeofchange/*_test.js',
      './e2e/tests/api_tests/noticeofchange/*_test.js',
      './e2e/tests/ui_tests/sdo/*_test.js',
      './e2e/tests/api_tests/sdo/*_test.js',
    ]
  ];
  return files;
};

const workerConfig = {
  testConfig: './codecept.config.js',
  by: splitTests
};

const workers = new Workers(null, workerConfig);

// split tests by suites in 3 groups
const testGroups = workers.createGroupsOfSuites(3);

for (const group of testGroups) {
  const worker = workers.spawn();
  worker.addTests(group);
}

// Listen events for failed test
workers.on(event.test.failed, (failedTest) => {
  console.log('Failed : ', failedTest.title);
});

// Listen events for passed test
workers.on(event.test.passed, (successTest) => {
  console.log('Passed : ', successTest.title);
});

// test run status will also be available in event
workers.on(event.all.result, () => {
  // Use printResults() to display result with standard style
  workers.printResults();
});

workers.on('message', (data) => {
  console.log(data);
});

async function runWorkers() {
  try {
      // run bootstrapAll
      await workers.bootstrapAll();
      // run tests
      await workers.run();
  } finally {
      // run teardown All
      await workers.teardownAll();
  }
}

runWorkers();