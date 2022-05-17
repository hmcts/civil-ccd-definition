/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('1v1 Unspec defaultJudgement @e2e-dj');

Scenario('DefaultJudgement @create-claim ', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  //await api.notifyClaim(config.applicantSolicitorUser);
});
