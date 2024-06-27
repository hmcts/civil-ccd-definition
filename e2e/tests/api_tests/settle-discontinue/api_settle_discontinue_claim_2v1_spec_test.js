/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const caseWorkerUser = config.hearingCenterAdminWithRegionId2;
// To use on local because the idam images are different
// const caseWorkerUser = config.tribunalCaseworkerWithRegionId1Local;

Feature('CCD Settle and discontinue claim 2v1 API test @api-spec @api-nonprod @api-settle-discont');
Scenario('Settle claim 2v1 scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
    await api_spec.createCaseFlags(caseWorkerUser);
    await api_spec.manageCaseFlags(caseWorkerUser);
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
