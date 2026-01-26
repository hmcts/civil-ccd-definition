

const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';

// add @api-tests to run

Feature('Unspec 1v2DS api journey').tag('@api-nightly-prod @api-unspec-full-defence');

Scenario('01 Create claim', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
});

Scenario('02 HMCTS admin adds a case note to case', async ({I, api}) => {
  await api.addCaseNote(config.adminUser);
});

Scenario('03 Amend claim documents', async ({I, api}) => {
  await api.amendClaimDocuments(config.applicantSolicitorUser);
});

Scenario('04 Notify claim', async ({I, api}) => {
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
});

Scenario('05 Notify claim details', async ({I, api}) => {
  await api.notifyClaimDetails(config.applicantSolicitorUser);
});

Scenario('06 Amend party details', async ({I, api}) => {
  await api.amendPartyDetails(config.adminUser);
});

Scenario('07 Acknowledge claim Solicitor 1', async ({I, api}) => {
  await api.acknowledgeClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
});

//Skipping this test as it is failing with partyIDs at the moment
Scenario.skip('08 Acknowledge claim Solicitor 2', async ({I, api}) => {
  await api.acknowledgeClaim(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
});

Scenario('09 Inform agreed extension date Solicitor 1', async ({I, api}) => {
  await api.informAgreedExtension(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
});

Scenario('10 Inform agreed extension date Solicitor 2', async ({I, api}) => {
  await api.informAgreedExtension(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
});

Scenario('11 Defendant response Solicitor 1', async ({I, api}) => {
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
});

Scenario('12 Defendant response Solicitor 2', async ({I, api}) => {
  await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
});

Scenario('13 Claimant response', async ({I, api}) => {
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
});

Scenario.skip('14 Add case flags', async ({api}) => {
 await api.createCaseFlags(config.hearingCenterAdminWithRegionId1);
});

Scenario.skip('15 Manage case flags', async ({api}) => {
 await api.manageCaseFlags(config.hearingCenterAdminWithRegionId1);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});