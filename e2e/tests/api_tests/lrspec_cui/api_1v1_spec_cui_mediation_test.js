const config = require('../../../config.js');

const claimType = 'SmallClaims';
let carmEnabled = false;
let claimRef;

async function prepareClaim(api_spec_cui, carmEnabled) {
  claimRef = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, '', claimType, carmEnabled);
  await api_spec_cui.performCitizenResponse(config.defendantCitizenUser, claimRef, claimType);
  await api_spec_cui.viewAndRespondToDefence(config.applicantSolicitorUser, config.defenceType.rejectAllDisputeAll, 'IN_MEDIATION');
}


Feature('Unsuccessful mediation for spec small claim with unrepresented defendant @cui-carm');

Scenario('CARM enabled', async ({api_spec_cui}) => {
  carmEnabled = true;
  await prepareClaim(api_spec_cui, carmEnabled);
  await api_spec_cui.mediationUnsuccesful(config.adminUser, carmEnabled);
});

Scenario('CARM not enabled', async ({api_spec_cui}) => {
  carmEnabled = false;
  await prepareClaim(api_spec_cui, carmEnabled);
  await api_spec_cui.mediationUnsuccesful(config.adminUser, carmEnabled);
});


