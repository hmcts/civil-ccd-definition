/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const intermediateTrackClaimAmount = '99000';
const mintiEnabled = true;
const track = 'INTERMEDIATE_CLAIM';

Feature('CCD API test unspec intermediate @api-unspec-multi-intermediate');

Scenario('1v1 Create Unspecified Intermediate Track claim @api-nonprod', async ({api}) => {
  const mpScenario = 'ONE_V_ONE';
  await prepareClaim(api, mpScenario, intermediateTrackClaimAmount, track);
});

Scenario('1v2 Same Solicitor Create Unspecified Intermediate Track claim', async ({api}) => {
  const mpScenario = 'ONE_V_TWO_ONE_LEGAL_REP';
  await prepareClaim(api, mpScenario, intermediateTrackClaimAmount, track);
});

Scenario('2v1 Create Unspecified Intermediate Track claim', async ({api}) => {
  const mpScenario = 'TWO_V_ONE';
  await prepareClaim(api, mpScenario, intermediateTrackClaimAmount, track);
});

async function prepareClaim(api, mpScenario, claimAmount) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount, mintiEnabled);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, track);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL', 'FOR_SDO', track);

}

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
