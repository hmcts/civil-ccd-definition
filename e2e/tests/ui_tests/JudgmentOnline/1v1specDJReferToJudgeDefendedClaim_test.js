

const config = require('../../../config.js');

Feature('1v1 spec defaultJudgement @e2e-1v1-dj @master-e2e-ft @e2e-dj-spec @non-prod-e2e-ft');

Scenario('DefaultJudgement @create-claim ', async ({I, api_spec, LRspec}) => {

  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  let caseid = await api_spec.getCaseId();
  await LRspec.setCaseId(caseid);
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);

  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(caseid, 'ONE_V_ONE', 'SPEC');

}).retry(2);

Scenario('Refer to judge (defence received in time)', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await LRspec.login(config.hearingCenterAdminWithRegionId2);
    await LRspec.requestReferToJudgeDefendedClaimUI();
  }
}).retry(2);

 Scenario('Defence received in time - order that judgment is set aside', async ({LRspec}) => {
  if (['aat','demo'].includes(config.runningEnv)) {
    await LRspec.login(config.judgeUser2WithRegionId2);
    await LRspec.requestDefenceReceivedInTimeOrderThatJudgmentIsSetAside();
  }
}).retry(4);

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
