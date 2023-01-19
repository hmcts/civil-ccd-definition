/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';
let caseProgressionOfflineExpectedTask;
let summaryJudgmentDirectionsExpectedTask;
if (config.runWAApiTest) {
  summaryJudgmentDirectionsExpectedTask = require('../../../../wa/tasks/fastTrackDirectionsTask.js');
}

Feature('CCD 1v1 API test @api-sdo , @dmn-task-sdo');

let caseId;

Scenario('Default Judgment claim', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  // await api.addCaseNote(config.adminUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  // await api.defaultJudgment(config.applicantSolicitorUser);
  caseId = await api.getCaseId();
});

Scenario('Verify Direction order(summaryJudgmentDirectionsTask) Judge task', async ({I, api, WA}) => {
  if (config.runWAApiTest) {
    const task = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.fastTrackDirections);
    WA.validateTaskInfo(task, summaryJudgmentDirectionsExpectedTask);
  }
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
