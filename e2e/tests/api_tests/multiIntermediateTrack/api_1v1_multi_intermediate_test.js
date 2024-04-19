/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';
const multiTrack = '200001'
const intermediateTrack = '99000'


//This test runs in api_judgment_online_1v1_test - so running only in nightly
Feature('CCD 1v1 API test unspec intermediate and multi track @api-unspec-multi-intermediate @api-nonprod');

Scenario('Create Multi Track claim', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, multiTrack);
});

Scenario('Create Intermediate Track claim', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, intermediateTrack);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
