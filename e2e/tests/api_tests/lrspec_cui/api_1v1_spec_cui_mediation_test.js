const config = require('../../../config.js');

const claimType = 'SmallClaims';
let carmEnabled = false;
let claimRef;

async function prepareClaim(api_spec_cui, carmEnabled) {
  claimRef = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, '', claimType, carmEnabled);
  await api_spec_cui.performCitizenResponse(config.defendantCitizenUser, claimRef, claimType);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'IN_MEDIATION');
}


Feature('Unsuccessful mediation for spec small claim with unrepresented defendant @cui-carm @api-nonprod');

Scenario('CARM enabled', async ({api_spec_cui}) => {
  carmEnabled = true;
  await prepareClaim(api_spec_cui, carmEnabled);
  // nbcUserWithRegionId1 doesn't exist locally
  await api_spec_cui.mediationUnsuccessful(config.nbcUserWithRegionId1, carmEnabled);
});

Scenario('CARM not enabled', async ({api_spec_cui}) => {
  carmEnabled = false;
  await prepareClaim(api_spec_cui, carmEnabled);
  // nbcUserWithRegionId1 doesn't exist locally
  await api_spec_cui.mediationUnsuccessful(config.nbcUserWithRegionId1, carmEnabled);
});


