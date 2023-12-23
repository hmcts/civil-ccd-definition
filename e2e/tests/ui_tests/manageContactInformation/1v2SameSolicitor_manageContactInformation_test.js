const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO_ONE_LEGAL_REP';

Feature('1v2 Same Solicitor - Manage Contact Information @e2e-sher-1v1 @e2e-mci @master-e2e-ft');

Scenario('Create claim to claimant response', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.addDefendantLitigationFriend(config.defendantSolicitorUser, mpScenario);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
});

Scenario('Manage Contact Information For Admin', async ({I, api}) => {
  await I.login(config.adminUser);
  // this one should work
  await I.manageWitnessesForDefendant();
});

Scenario('Manage Contact Information For Claimant Solicitor', async ({I, api}) => {
  await I.login(config.applicantSolicitorUser);
  // this one has some errors midway but the ids should be correct
  await I.manageOrganisationIndividualsForClaimant();
});

Scenario('Manage Contact Information For Defendant parties', async ({I, api}) => {
  await I.login(config.defendantSolicitorUser);
  // this one has some errors midway but the ids should be correct - might have an error because lit friend doesn't have documents in `addDefendantLitigationFriend`
  await I.manageLitigationFriendForDefendant();
  // this one have not completed.
  await I.manageDefendant();
});
