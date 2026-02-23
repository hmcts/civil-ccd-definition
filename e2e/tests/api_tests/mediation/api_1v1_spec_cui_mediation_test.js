const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');

const claimType = 'SmallClaims';
let carmEnabled = false;
let claimRef;

let mediationAdmin = config.nbcUserWithRegionId1;

// set config.localMediationTests to true to run locally
Feature('Unsuccessful mediation for spec small claim with unrepresented defendant')
  .tag('@civil-service-nightly @api-mediation');

Before(async () => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('CARM enabled', async ({api_spec_cui}) => {
  carmEnabled = true;
  claimRef = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, '', claimType, carmEnabled);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, claimRef, claimType, carmEnabled);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'Yes', 'IN_MEDIATION', carmEnabled);
  await api_spec_cui.mediationUnsuccessful(mediationAdmin, carmEnabled);
}).tag('@civil-service-master @civil-service-pr');

Scenario('CARM not enabled', async ({api_spec_cui}) => {
  carmEnabled = false;
  claimRef = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, '', claimType, carmEnabled);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, claimRef, claimType, carmEnabled);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'Yes', 'IN_MEDIATION', carmEnabled);
  await api_spec_cui.mediationUnsuccessful(mediationAdmin, carmEnabled);
});

AfterSuite(async ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});

