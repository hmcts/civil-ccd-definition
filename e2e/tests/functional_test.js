const config = require('../config.js');

Feature('@api-unspec @e2e-unspec-1v2DS @e2e-spec-1v2DS @e2e-sdo @e2e-1v1-dj');

Scenario('Login', async ({I}) => {
  await I.retry(5).login(config.applicantSolicitorUser);
  await I.retry(5).see('Case list');
});
