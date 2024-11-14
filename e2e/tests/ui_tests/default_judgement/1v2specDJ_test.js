

const config = require('../../../config.js');

Feature('1v2 spec defaultJudgement @e2e-dj @e2e-nightly-prod');

Scenario.skip('DefaultJudgement @create-claim ', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');

  let caseid = await api_spec.getCaseId();

  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await I.login(config.applicantSolicitorUser);
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await I.initiateDJSpec(caseid, 'ONE_V_TWO', 'SPEC');
  }
}).retry(3);

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
