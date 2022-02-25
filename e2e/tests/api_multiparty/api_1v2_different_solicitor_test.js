/* eslint-disable no-unused-vars */

const config = require('../../config.js');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';

// add @api-tests to run
Feature('CCD 1v2 Different Solicitor API test @api-multiparty @api-tests-1v2DS');

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

Scenario('Change applicant 1 solicitor email', async ({I, api}) => {
  await api.changeSolicitorEmail(config.applicantSolicitorUser, mpScenario, 'Applicant1Solicitor');
});

Scenario('Change respondent 1 solicitor email', async ({I, api}) => {
  await api.changeSolicitorEmail(config.defendantSolicitorUser, mpScenario, 'Respondent1Solicitor');
});

Scenario('Change respondent 2 solicitor email', async ({I, api}) => {
  await api.changeSolicitorEmail(config.secondDefendantSolicitorUser, mpScenario, 'Respondent2Solicitor');
});

Scenario('Acknowledge claim Solicitor 1', async ({I, api}) => {
  await api.acknowledgeClaim(config.defendantSolicitorUser, mpScenario, 'Respondent1Solicitor');
});

Scenario('Acknowledge claim Solicitor 2', async ({I, api}) => {
  await api.acknowledgeClaim(config.secondDefendantSolicitorUser, mpScenario, 'Respondent2Solicitor');
});

Scenario('Inform agreed extension date Solicitor 1', async ({I, api}) => {
  await api.informAgreedExtension(config.defendantSolicitorUser, mpScenario, 'Respondent1Solicitor');
});

Scenario('Inform agreed extension date Solicitor 2', async ({I, api}) => {
  await api.informAgreedExtension(config.secondDefendantSolicitorUser, mpScenario, 'Respondent2Solicitor');
});

Scenario('Defendant response Solicitor 1', async ({I, api}) => {
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'Respondent1Solicitor');
});

Scenario('Defendant response Solicitor 2', async ({I, api}) => {
  await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'Respondent2Solicitor');
});

Scenario('Claimant response', async ({I, api}) => {
  await api.claimantResponse(config.applicantSolicitorUser);
});
