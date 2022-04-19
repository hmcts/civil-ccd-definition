/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v1 API test @api-spec @api-spec-1v1');

Scenario('Create claim spec', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
});

// Scenario('Defendant response', async ({I, api_spec}) => {
//   await api_spec.defendantResponseNoChecks(config.defendantSolicitorUser);
// });
//
// Scenario('Claimant response', async ({I, api_spec}) => {
//   await api_spec.claimantResponseNoChecks(config.applicantSolicitorUser);
// });
