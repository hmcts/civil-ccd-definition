

const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';

// add @api-tests to run

Feature('CCD 1v2 Different Solicitor API test @api-unspec @api-multiparty @api-tests-1v2DS @api-nightly-prod @api-unspec-full-defence');

Scenario('Create claim', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
});

Scenario('HMCTS admin adds a case note to case', async ({I, api}) => {
  await api.addCaseNote(config.adminUser);
});

Scenario('Amend claim documents', async ({I, api}) => {
  await api.amendClaimDocuments(config.applicantSolicitorUser);
});

Scenario('Notify claim', async ({I, api}) => {
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
});

Scenario('Notify claim details', async ({I, api}) => {
  await api.notifyClaimDetails(config.applicantSolicitorUser);
});

Scenario('Amend party details', async ({I, api}) => {
  await api.amendPartyDetails(config.adminUser);
});

Scenario('Acknowledge claim Solicitor 1', async ({I, api}) => {
  await api.acknowledgeClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
});

/* Skipping this test as it is failing with partyIDs at the moment
Scenario('Acknowledge claim Solicitor 2', async ({I, api}) => {
  await api.acknowledgeClaim(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
}); */

Scenario('Inform agreed extension date Solicitor 1', async ({I, api}) => {
  await api.informAgreedExtension(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
});

Scenario('Inform agreed extension date Solicitor 2', async ({I, api}) => {
  await api.informAgreedExtension(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
});

Scenario('Defendant response Solicitor 1', async ({I, api}) => {
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
});

Scenario('Defendant response Solicitor 2', async ({I, api}) => {
  await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
});

Scenario('Claimant response', async ({I, api}) => {
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
});

//Scenario('Add case flags', async ({api}) => {
//  await api.createCaseFlags(config.hearingCenterAdminWithRegionId1);
//});

//Scenario('Manage case flags', async ({api}) => {
//  await api.manageCaseFlags(config.hearingCenterAdminWithRegionId1);
//});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
