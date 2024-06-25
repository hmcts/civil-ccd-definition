/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD Settle and discontinue claim 2v1 API test @api-spec');
Scenario('Settle claim 2v1 scenario', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec.createCaseFlags(config.hearingCenterAdminWithRegionId2);
  await api_spec.manageCaseFlags(config.hearingCenterAdminWithRegionId2);
  await api_spec.settleClaimSelectClaimant(config.applicantSolicitorUser, 'YES');
});

Scenario.only('Discontinue claim 2v1 scenario', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec.discontinueClaim(config.applicantSolicitorUser);

});

AfterSuite(async  ({api_spec}) => {
  //await api_spec.cleanUp();
});
