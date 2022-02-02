/* eslint-disable no-unused-vars */

const config = require('../../config.js');

// add @api-tests to run
Feature('CCD 1v2 Different Solicitor API test');

Scenario('Create claim', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
});

Scenario('HMCTS admin adds a case note to case', async ({I, api}) => {
  await api.addCaseNote(config.adminUser);
});

Scenario('Amend claim documents', async ({I, api}) => {
  await api.amendClaimDocuments(config.applicantSolicitorUser);
});

Scenario('Notify claim', async ({I, api}) => {
  await api.notifyClaim(config.applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
});

Scenario('Notify claim details', async ({I, api}) => {
  await api.notifyClaimDetails(config.applicantSolicitorUser);
});

Scenario('Amend party details', async ({I, api}) => {
  await api.amendPartyDetails(config.adminUser);
});

Scenario('Acknowledge claim Solicitor 1', async ({I, api}) => {
  await api.acknowledgeClaimSolicitorOne(config.defendantSolicitorUser);
});

Scenario('Acknowledge claim Solicitor 2', async ({I, api}) => {
  await api.acknowledgeClaimSolicitorTwo(config.secondDefendantSolicitorUser);
});

// skipped because unable to get getCcdCaseReference in InformAgreedExtensionDateCallbackHandler under
// solicitorRepresentsOnlyRespondent2
Scenario.skip('Inform agreed extension date', async ({I, api}) => {
  await api.informAgreedExtension(config.defendantSolicitorUser);
});

Scenario.skip('Defendant response', async ({I, api}) => {
  await api.defendantResponseSolicitorOne(config.defendantSolicitorUser);
});

Scenario.skip('Claimant response', async ({I, api}) => {
  await api.claimantResponse(config.applicantSolicitorUser);
});
