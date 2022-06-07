/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v2 different solicitor API test @api-spec-1v2ds');

Scenario('Create claim spec 1v2', async ({I, api_spec}) => {
  await api_spec.createClaim(config.applicantSolicitorUser,
    require('../../../fixtures/events/createClaimSpec.js').createClaimDataByPage('ONE_V_TWO')
  );
});

