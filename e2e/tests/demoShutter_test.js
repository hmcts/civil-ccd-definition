const config = require('../../../config.js');
const apiRequest = require('./apiRequest.js');

Feature('@api-unspec');

Scenario('Login', async ({}) => {
  await apiRequest.setupTokens(config.applicantSolicitorUser);
});
