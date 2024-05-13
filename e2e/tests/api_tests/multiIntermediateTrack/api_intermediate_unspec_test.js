/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const intermediateTrackClaimAmount = '99000';
const mintiEnabled = true;
const track = 'INTERMEDIATE_CLAIM';

Feature('CCD API test unspec intermediate @api-unspec-multi-intermediate @api-nonprod');

Scenario('1v1 Create Unspecified Intermediate Track claim @api-nonprod', async ({api}) => {
  const mpScenario = 'ONE_V_ONE';
  await prepareClaim(api, mpScenario, intermediateTrackClaimAmount, track);
});

Scenario('1v2 Different Solicitors Create Unspecified Intermediate Track claim', async ({api}) => {
  const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
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

async function defendantResponse(api, mpScenario) {
  if (mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP') {
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne', track);
    await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo', track);
  } else {
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, track);
  }
}

async function prepareClaim(api, mpScenario, claimAmount) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount, mintiEnabled);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await defendantResponse(api, mpScenario);
  // await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', '', track);
}

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
