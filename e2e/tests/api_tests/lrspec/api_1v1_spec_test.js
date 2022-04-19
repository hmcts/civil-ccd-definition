/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v1 API test @api-spec @api-spec-1v1');

Scenario('Create claim spec', async ({I, LRspec}) => {
  await LRspec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
});
