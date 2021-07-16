const config = require('../config.js');

Feature('Smoke tests @smoke-tests');

Scenario('Sign in as solicitor user', async (I) => {
  await I.login(config.applicantSolicitorUser);
  I.click('body > exui-root > xuilib-cookie-banner > div > div > div.govuk-button-group > button:nth-child(1)');
  await I.see('Case List');
});
