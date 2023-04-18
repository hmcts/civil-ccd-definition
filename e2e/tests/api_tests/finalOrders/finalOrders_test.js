const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE';
const judgeUser = config.judgeUserWithRegionId1;

Feature('CCD 1v1 API test @api-finalOrders');

async function prepareClaimForFinalOrders(api) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');
}

Scenario('1v1 Judge complete Final Order', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimForFinalOrders(api);
    await api.createFinalOrder(judgeUser);
  }
});
