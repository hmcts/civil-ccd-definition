const config = require('../../../config.js');
const apiRequest = require('./apiRequest.js');

Scenario('Login', async ({}) => {
  await apiRequest.setupTokens(config.applicantSolicitorUser);
});
