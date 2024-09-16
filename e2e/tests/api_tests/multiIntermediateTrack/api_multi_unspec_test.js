/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const multiTrackClaimAmount = '200001';
const mintiEnabled = true;
const track = 'MULTI_CLAIM';

Feature('CCD API test unspec multi track @api-unspec-multi-intermediate');

Scenario.only('1v1 Create Unspecified Multi Track claim @api-nonprod', async ({api}) => {
  const mpScenario = 'ONE_V_ONE';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount);
});

Scenario('1v2 Different Solicitors Create Unspecified Multi Track claim', async ({api}) => {
  const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount);
});

Scenario('1v2 Same Solicitor Create Unspecified Multi Track claim', async ({api}) => {
  const mpScenario = 'ONE_V_TWO_ONE_LEGAL_REP';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount);
});

Scenario('2v1 Create Unspecified Multi Track claim', async ({api}) => {
  const mpScenario = 'TWO_V_ONE';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount);
});

async function defendantResponse(api, mpScenario) {
  if (mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP') {
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
    await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  } else {
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  }
}

async function prepareClaim(api, mpScenario, claimAmount) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount, mintiEnabled);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await defendantResponse(api, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', track);
}

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
