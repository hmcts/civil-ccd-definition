const config = require('../config.js');
const {waitForFinishedBusinessProcess, assignCaseToDefendant} = require('../api/testingSupport');

const mpScenario = 'ONE_V_ONE';


Feature('RPA handoff points tests @rpa-handoff-tests');

Scenario('Take claim offline', async ({I, api}) => {
  await createCaseUpUntilNotifyClaimDetails(I, api);

  await api.acknowledgeClaim(config.defendantSolicitorUser, mpScenario);
  await api.informAgreedExtension(config.defendantSolicitorUser, mpScenario);

  await I.login(config.adminUser);
  await I.navigateToCaseDetails(api.caseId);
  await I.caseProceedsInCaseman();
  await I.assertNoEventsAvailable();
  await I.signOut();
}).retry(3);

Scenario('Defendant representativeRegistered false - Claimant Litigant In Person', async ({I, api}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser);

  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(api.caseId);
  await I.assertNoEventsAvailable();
  await I.signOut();
}).retry(3);

Scenario('Defendant - Defend part of Claim', async ({I, api}) => {
  await createCaseUpUntilNotifyClaimDetails(I, api);
  await defendantAcknowledgeAndRespondToClaim(I, api, 'partDefence', 'partAdmission');

  await I.navigateToCaseDetails(api.caseId);
  await I.assertNoEventsAvailable();
  await I.signOut();
}).retry(3);

Scenario('Defendant - Defends, Claimant decides not to proceed', async ({I, api}) => {
  await createCaseUpUntilNotifyClaimDetails(I, api);
  await defendantAcknowledgeAndRespondToClaimFullDefence(I, api);

  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(api.caseId);
  await I.respondToDefenceDropClaim();
  await I.assertNoEventsAvailable();
  await I.signOut();
}).retry(3);

Scenario('Defendant - Defends, Claimant decides to proceed', async ({I, api}) => {
  await createCaseUpUntilNotifyClaimDetails(I, api);
  await defendantAcknowledgeAndRespondToClaimFullDefence(I, api);
  await api.claimantResponse(config.applicantSolicitorUser);

  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(api.caseId);
  await I.assertNoEventsAvailable();
  await I.signOut();
}).retry(3);

const createCaseUpUntilNotifyClaimDetails = async (I, api) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await assignCaseToDefendant(api.caseId);
};

const defendantAcknowledgeAndRespondToClaim = async (I, api, acknowledgeClaimResponse, respondToClaimResponse) => {
  await I.login(config.defendantSolicitorUser);
  await I.navigateToCaseDetails(api.caseId);
  await I.acknowledgeClaim(acknowledgeClaimResponse);
  await api.informAgreedExtension(config.defendantSolicitorUser, mpScenario);
  await I.respondToClaim({defendant1Response: respondToClaimResponse});
  await waitForFinishedBusinessProcess(api.caseId);
};

const defendantAcknowledgeAndRespondToClaimFullDefence = async (I, api) => {
  await api.acknowledgeClaim(config.defendantSolicitorUser, mpScenario);
  await api.informAgreedExtension(config.defendantSolicitorUser, mpScenario);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
};
