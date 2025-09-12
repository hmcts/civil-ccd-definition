const config = require('../../../config.js');
const {addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
let caseNumber;
let validDecisionOnReconsiderationRequestTask;

if (config.runWAApiTest) {
  validDecisionOnReconsiderationRequestTask = require('../../../../wa/tasks/decisionOnReconsiderationRequestTask.js');
}

async function prepareClaimSpec(api_spec_small) {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', true);
  await api_spec_small.claimantResponse(config.applicantSolicitorUser, true);
}

Feature('Request for reconsideration - 1v1 - spec @e2e-nightly-prod @e2e-rfr');

//This is being skipped in AAT until DTSCCI-2726
Scenario('1v1 spec request for reconsideration for Create a new SDO', async ({api_spec_small, LRspec}) => {
  if(['demo', 'preview'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec_small);
    await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
    caseNumber = await api_spec_small.getCaseId();
    await LRspec.setCaseId(caseNumber);
    addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
  }
}).retry(2);

//This is being skipped in AAT until DTSCCI-2726
Scenario('Request for Reconsideration by claimant', async ({LRspec}) => {
  if(['demo', 'preview'].includes(config.runningEnv)) {
    await LRspec.login(config.applicantSolicitorUser);
    await LRspec.requestForReconsiderationForUI();
  }
}).retry(2);

//This is being skipped in AAT until DTSCCI-2726
Scenario('Decision on Reconsideration Request with option No -- Generate a new SDO event', async ({LRspec, api, WA}) => {
  if(['demo', 'preview'].includes(config.runningEnv)) {
    await LRspec.login(config.judgeUserWithRegionId1);
    let taskId;
    if (config.runWAApiTest) {
      const decisionOnReconsiderationRequest = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseNumber, config.waTaskIds.decisionOnReconsiderationRequestTask);
      await WA.validateTaskInfo(decisionOnReconsiderationRequest, validDecisionOnReconsiderationRequestTask);
      taskId = decisionOnReconsiderationRequest['id'];
      await api.assignTaskToUser(config.judgeUserWithRegionId1, taskId);
    }
    await LRspec.decisionForReconsideration();
    if (config.runWAApiTest) {
      api.completeTaskByUser(config.judgeUserWithRegionId1, taskId);
    }
  }
}).retry(2);

//This is being skipped until DTSCCI-2726
Scenario('Create SDO journey - after Request for Reconsideration', async ({api_spec_small}) => {
  if(['demo', 'preview'].includes(config.runningEnv)) {
    await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
  }
}).retry(2);

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
  await unAssignAllUsers();
});
