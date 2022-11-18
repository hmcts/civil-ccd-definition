const config = require('../../../config.js');
const apiRequest = require('./apiRequest.js');

Feature('@api-unspec');

Scenario('Login', async ({I}) => {
  await I.retry(5).login(config.applicantSolicitorUser);
});
