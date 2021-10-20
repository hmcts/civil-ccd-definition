const config = require('../config.js');

Feature('Smoke tests @smoke-tests-spec');

Scenario('Sign in as solicitor user', async ({ I }) => {
  await I.login(config.applicantSolicitorUser);
  await I.see('Case list');
});
