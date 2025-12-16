

const config = require('../../../config.js');

let validDefenceReceivedInTimeOrderTask;

if (config.runWAApiTest) {
  validDefenceReceivedInTimeOrderTask = require('../../../../wa/tasks/defenceReceivedInTimeOrderThatJudgmentIsSetAside.js');
}

let caseNumber;

Feature('1v1 Spec Defence Received in Time Judgment Set Aside').tag('@ui-jo @ui-prod @ui-nightly-prod');

Scenario('Create 1v1 spec claim, request default judgment', async ({I, api_spec, LRspec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  caseNumber = await api_spec.getCaseId();
  await LRspec.setCaseId(caseNumber);
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);

  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(caseNumber, 'ONE_V_ONE', 'SPEC');

}).retry(2);

Scenario('Refer to judge (defence received in time)', async ({LRspec}) => {
  await LRspec.login(config.hearingCenterAdminWithRegionId2);
  await LRspec.requestReferToJudgeDefendedClaim();
}).retry(2);

 Scenario('Defence received in time - order that judgment is set aside', async ({LRspec, api, WA}) => {
  await LRspec.login(config.judgeUser2WithRegionId2);
  let taskId;
  if (config.runWAApiTest) {
    const defenceReceivedInTimeOrderTask = await api.retrieveTaskDetails(config.judgeUser2WithRegionId2, caseNumber, config.waTaskIds.orderToSetAsideDefendedClaim);
    console.log('defenceReceivedInTimeOrderTask...' , defenceReceivedInTimeOrderTask);
    WA.validateTaskInfo(defenceReceivedInTimeOrderTask, validDefenceReceivedInTimeOrderTask);
    taskId = defenceReceivedInTimeOrderTask['id'];
    api.assignTaskToUser(config.judgeUser2WithRegionId2, taskId);
  }
  await LRspec.generateDirectionsOrder();
  if (config.runWAApiTest) {
    api.completeTaskByUser(config.judgeUser2WithRegionId2, taskId);
  }
}).retry(2);

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
