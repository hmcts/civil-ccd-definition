const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO_ONE_LEGAL_REP';
let caseId;

Feature('1v2 Same Solicitor - Manage Contact Information @e2e-sher-1v1 @e2e-mci @master-e2e-ft');

Scenario('Create claim to claimant response', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.addDefendantLitigationFriend(config.defendantSolicitorUser, mpScenario);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  caseId = await api.getCaseId();
});

Scenario('Manage Contact Information For Admin', async ({I}) => {
  await I.login(config.adminUser);
  await I.manageWitnessesForDefendant(caseId);
});

Scenario('Manage Contact Information For Claimant Solicitor', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.manageOrganisationIndividualsForClaimant(caseId);
});

Scenario('Manage Contact Information For Defendant parties', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.manageLitigationFriendForDefendant(caseId);
  await I.manageDefendant(caseId);
});
