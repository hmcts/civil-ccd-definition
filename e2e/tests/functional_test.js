const config = require('../config.js');

Feature('@api-unspec');

Scenario('Login', async ({I}) => {
  await I.retry(5).login(config.applicantSolicitorUser);
  await I.retry(5).see('Case list');
});
