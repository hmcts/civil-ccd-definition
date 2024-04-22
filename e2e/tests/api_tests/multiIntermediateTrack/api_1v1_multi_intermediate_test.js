/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';
const multiTrack = '200001';
const intermediateTrack = '99000';


Feature('CCD 1v1 API test unspec intermediate and multi track @api-unspec-multi-intermediate @api-nonprod');

Scenario('1v1 Create Unspecified Multi Track claim', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, multiTrack);
});

Scenario('1v1 Create Unspecified Intermediate Track claim', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, intermediateTrack);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
