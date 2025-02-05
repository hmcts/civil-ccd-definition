const config = require('../../config.js');

Feature('Smoke tests @smoke-tests-unspec');

Scenario('Sign in as solicitor user @master-e2e-ft', async ({I}) => {
  await I.retry(5).login(config.applicantSolicitorUser);
  await I.retry(5).see('Case list');
}).retry(3);
