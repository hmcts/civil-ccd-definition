/* eslint-disable no-unused-vars */

const config = require('../../config.js');

// add @api-tests to run
Feature('CCD 1v2 Different Solicitor API test @api-multiparty @api-tests-1v2DS');

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

Scenario('Inform agreed extension date Solicitor 1', async ({I, api}) => {
  await api.informAgreedExtensionSolicitor1(config.defendantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
});

// TODO: Skipping this until CMC-1939 is fixed
Scenario.skip('Inform agreed extension date Solicitor 2', async ({I, api}) => {
  await api.informAgreedExtensionSolicitor2(config.secondDefendantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
});

Scenario('Defendant response Solicitor 1', async ({I, api}) => {
  await api.defendantResponseSolicitorOne(config.defendantSolicitorUser);
});

Scenario('Defendant response Solicitor 2', async ({I, api}) => {
  await api.defendantResponseSolicitorTwo(config.secondDefendantSolicitorUser);
});

Scenario('Claimant response', async ({I, api}) => {
  await api.claimantResponse(config.applicantSolicitorUser);
});
