/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const multiTrackClaimAmount = '200001';

Feature('CCD API test unspec multi track @api-unspec-multi-intermediate @api-nonprod');

Scenario('1v1 Create Unspecified Multi Track claim', async ({api}) => {
  const mpScenario = 'ONE_V_ONE';
  const track = 'MULTI_CLAIM';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount, track);
});

Scenario('1v2 Different Solicitors Create Unspecified Multi Track claim', async ({api}) => {
  const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
  const track = 'MULTI_CLAIM';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount, track);
});

Scenario('1v2 Same Solicitor Create Unspecified Multi Track claim', async ({api}) => {
  const mpScenario = 'ONE_V_TWO_ONE_LEGAL_REP';
  const track = 'MULTI_CLAIM';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount, track);
});

Scenario('2v1 Create Unspecified Multi Track claim', async ({api}) => {
  const mpScenario = 'TWO_V_ONE';
  const track = 'MULTI_CLAIM';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount, track);
});

async function defendantResponse(api, mpScenario) {
  if (mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP') {
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
    await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  } else {
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  }
}

async function prepareClaim(api, mpScenario, claimAmount, track) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount, true);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await defendantResponse(api, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', '', track);
}

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
