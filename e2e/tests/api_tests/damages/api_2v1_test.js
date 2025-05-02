

const config = require('../../../config.js');
const mpScenario = 'TWO_V_ONE';

Feature('CCD 2v1 API test @api-unspec @api-multiparty @api-tests-2v1 @api-prod @api-nightly-prod @api-unspec-full-defence');

Scenario('Create claim', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
});

//TODO - This test has to be fixed as it is failing in Civil Service.
Scenario.skip('HMCTS admin adds a case note to case', async ({I, api}) => {
  await api.addCaseNote(config.adminUser);
});

//TODO - This test has to be fixed as it is failing in Civil Service.
Scenario.skip('Amend claim documents', async ({I, api}) => {
  await api.amendClaimDocuments(config.applicantSolicitorUser);
});

Scenario('Notify claim', async ({I, api}) => {
  await api.notifyClaim(config.applicantSolicitorUser);
});

Scenario('Notify claim details', async ({I, api}) => {
  await api.notifyClaimDetails(config.applicantSolicitorUser);
});

//TODO - This test has to be fixed as it is failing in Civil Service.
Scenario.skip('Amend party details', async ({I, api}) => {
  await api.amendPartyDetails(config.adminUser);
});

//TODO - This test has to be fixed as it is failing in Civil Service.
Scenario.skip('Acknowledge claim', async ({I, api}) => {
  await api.acknowledgeClaim(config.defendantSolicitorUser, mpScenario);
});

//TODO - This test has to be fixed as it is failing in Civil Service.
Scenario.skip('Inform agreed extension date', async ({I, api}) => {
  await api.informAgreedExtension(config.defendantSolicitorUser, mpScenario);
});

Scenario('Defendant response', async ({I, api}) => {
  await api.defendantResponse(config.defendantSolicitorUser, 'TWO_V_ONE');
});

Scenario('Claimant response', async ({I, api}) => {
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
});

Scenario('Add case flags', async ({api}) => {
  await api.createCaseFlags(config.hearingCenterAdminWithRegionId1);
});

Scenario('Manage case flags', async ({api}) => {
  await api.manageCaseFlags(config.hearingCenterAdminWithRegionId1);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
