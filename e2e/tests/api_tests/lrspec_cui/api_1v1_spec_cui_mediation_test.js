const config = require('../../../config.js');

const claimType = 'SmallClaims';
let carmEnabled = false;
let claimRef;

let mediationAdmin = config.localMediationTests ? config.nbcUserLocal : config.nbcUserWithRegionId1;

async function prepareClaim(api_spec_cui, carmEnabled) {
  claimRef = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, '', claimType, carmEnabled);
  await api_spec_cui.performCitizenResponse(config.defendantCitizenUser, claimRef, claimType);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'IN_MEDIATION');
}


// set config.localMediationTests to true to run locally
Feature('Unsuccessful mediation for spec small claim with unrepresented defendant @mm');

Scenario('CARM enabled', async ({api_spec_cui}) => {
  carmEnabled = true;
  await prepareClaim(api_spec_cui, carmEnabled);
  await api_spec_cui.mediationUnsuccessful(mediationAdmin, carmEnabled);
});



AfterSuite(async ({api_spec_cui}) => {
  //await api_spec_cui.cleanUp();
});


