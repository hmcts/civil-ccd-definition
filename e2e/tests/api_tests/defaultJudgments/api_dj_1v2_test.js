/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO_ONE_LEGAL_REP';
let caseProgressionOfflineExpectedTask, summaryJudgmentDirectionsExpectedTask, taskId;
if (config.runWAApiTest) {
  summaryJudgmentDirectionsExpectedTask = require('../../../../wa/tasks/summaryJudgmentDirectionsTask.js');
  caseProgressionOfflineExpectedTask = require('../../../../wa/tasks/caseProgressionTakeCaseOfflineTask.js');
}

Feature('CCD 1v2 API test @api-dj-1v2, @api-dj @dmn-task-dj @api-prod-dj @master-e2e-ft');

let caseId;

Scenario('Default Judgment claim 1v2', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.addCaseNote(config.adminUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  caseId = await api.getCaseId();
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  await api.defaultJudgment(config.applicantSolicitorUser, 'TRIAL_HEARING');
  await api.initiateGeneralApplication(caseId, config.applicantSolicitorUser, 'JUDICIAL_REFERRAL');
});

Scenario('Verify Direction order(summaryJudgmentDirectionsTask) Judge task', async ({I, api, WA}) => {
  if (config.runWAApiTest) {
    const summaryJudgmentDirectionsTask = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.judgeUnspecDJTask);
    console.log('summaryJudgmentDirectionsTask...' , summaryJudgmentDirectionsTask);
    WA.validateTaskInfo(summaryJudgmentDirectionsTask, summaryJudgmentDirectionsExpectedTask);
    taskId = summaryJudgmentDirectionsTask['id'];
    api.assignTaskToUser(config.judgeUserWithRegionId1, taskId);
  }
});

Scenario('Default Judgment claim SDO', async ({I, api}) => {
  await api.sdoDefaultJudgment(config.judgeUserWithRegionId1, 'TRIAL_HEARING');
  if (config.runWAApiTest) {
    api.completeTaskByUser(config.judgeUserWithRegionId1, taskId);
  }
});

Scenario('Case progression tests (Upload evidence, schedule a hearing, amend hearing date, pay fee, confirm trial readiness)', async ({I, api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api.evidenceUploadJudge(config.judgeUserWithRegionId1, 'NOTE_ONLY', 'CASE_PROGRESSION');
    await api.evidenceUploadJudge(config.judgeUserWithRegionId1, 'DOCUMENT_ONLY', 'CASE_PROGRESSION');
    await api.evidenceUploadJudge(config.judgeUserWithRegionId1, 'DOCUMENT_AND_NOTE', 'CASE_PROGRESSION');
    await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'OTHER');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
    await api.trialReadiness(config.applicantSolicitorUser);
    await api.trialReadiness(config.defendantSolicitorUser);
  }
});

Scenario('Verify Case progression trial bundle', async ({I, api, WA}) => {
  if (['demo'].includes(config.runningEnv)) {
    await api.triggerBundle(config.systemupdate);
  }
});

Scenario.skip('Verify Case progression caseProgressionTakeCaseOfflineTask hearing center admin task', async ({I, api, WA}) => {
  if (config.runWAApiTest) {
    const caseProgressionTakeCaseOfflineTask = await api.retrieveTaskDetails(config.hearingCenterAdminWithRegionId1, caseId, config.waTaskIds.listingOfficerCaseProgressionTask);
    console.log('caseProgressionTakeCaseOfflineTask...' , caseProgressionTakeCaseOfflineTask);
    WA.validateTaskInfo(caseProgressionTakeCaseOfflineTask, caseProgressionOfflineExpectedTask);
    if (config.runWAApiTest) {
      taskId = caseProgressionTakeCaseOfflineTask['id'];
      api.assignTaskToUser(config.hearingCenterAdminWithRegionId1, taskId);
      api.completeTaskByUser(config.judgeUserWithRegionId1, taskId);
    }
  }
});

AfterSuite(async  ({api}) => {
  //await api.cleanUp();
});
