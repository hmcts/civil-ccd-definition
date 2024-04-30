/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const intermediateTrackClaimAmount = '99000';

Feature('CCD API test unspec intermediate @api-unspec-multi-intermediate @api-nonprod');

Scenario('1v1 Create Unspecified Intermediate Track claim', async ({api}) => {
  const mpScenario = 'ONE_V_ONE';
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, intermediateTrackClaimAmount);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
