/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD Settle and discontinue claim 2v1 API test @api-spec @api-nonprod');
Scenario('Settle claim 2v1 scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
    await api_spec.createCaseFlags(config.hearingCenterAdminWithRegionId2);
    await api_spec.manageCaseFlags(config.hearingCenterAdminWithRegionId2);
    await api_spec.settleClaimSelectClaimant(config.applicantSolicitorUser, 'YES');
  }
});

Scenario('Discontinue claim 1v2 scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    let mpScenario = 'ONE_V_TWO';
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    await api_spec.discontinueClaim(config.applicantSolicitorUser, mpScenario);
  }
});

Scenario('Discontinue claim 2v1 scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    let mpScenario = 'TWO_V_ONE';
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    await api_spec.discontinueClaim(config.applicantSolicitorUser, mpScenario);
  }
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
