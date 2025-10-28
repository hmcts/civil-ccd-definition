const config = require('../../../config.js');
const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
const {unAssignAllUsers, addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
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

Feature('Request for reconsideration - 1v1 - spec @api-spec-1v1 @e2e-nightly-prod @e2e-rfr');

Scenario('1v1 spec request for reconsideration for other options', async ({api_spec_small, LRspec}) => {
  await prepareClaimSpec(api_spec_small);
  await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
  caseNumber = await api_spec_small.getCaseId();
  await LRspec.setCaseId(caseNumber);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
}).retry(2);

Scenario('Request for Reconsideration', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.requestForReconsiderationForUI();
}).retry(2);

Scenario('Decision on Reconsideration Request', async ({LRspec, api, WA}) => {
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
}).retry(2);


Scenario('1v1 spec request for reconsideration to uphold the previous order made', async ({api_spec_small, LRspec}) => {
  await prepareClaimSpec(api_spec_small);
  caseNumber = await api_spec_small.getCaseId();
  await LRspec.setCaseId(caseNumber);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
  await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
}).retry(2);

Scenario('Request for Reconsideration to uphold the previous order made', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.requestForReconsiderationForUI();
}).retry(2);

Scenario('Decision on Reconsideration Request to uphold the previous order made', async ({LRspec, api, WA}) => {
  await LRspec.login(config.judgeUserWithRegionId1);
  let taskId;
  if (config.runWAApiTest) {
    const decisionOnReconsiderationRequest = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseNumber, config.waTaskIds.decisionOnReconsiderationRequestTask);
    await WA.validateTaskInfo(decisionOnReconsiderationRequest, validDecisionOnReconsiderationRequestTask);
    taskId = decisionOnReconsiderationRequest['id'];
    await api.assignTaskToUser(config.judgeUserWithRegionId1, taskId);
  }
  await LRspec.decisionForReconsiderationYesOption();
  if (config.runWAApiTest) {
    api.completeTaskByUser(config.judgeUserWithRegionId1, taskId);
  }
}).retry(2);


Scenario('1v1 spec request for reconsideration to previous order needs amending', async ({api_spec_small, LRspec}) => {
  await prepareClaimSpec(api_spec_small);
  caseNumber = await api_spec_small.getCaseId();
  await LRspec.setCaseId(caseNumber);
  await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
}).retry(2);

Scenario('Request for Reconsideration to previous order needs amending', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.requestForReconsiderationForUI();
}).retry(2);

Scenario('Decision on Reconsideration Request to previous order needs amending', async ({LRspec, api, WA}) => {
  await LRspec.login(config.judgeUserWithRegionId1);
  let taskId;
  if (config.runWAApiTest) {
    const decisionOnReconsiderationRequest = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseNumber, config.waTaskIds.decisionOnReconsiderationRequestTask);
    await WA.validateTaskInfo(decisionOnReconsiderationRequest, validDecisionOnReconsiderationRequestTask);
    taskId = decisionOnReconsiderationRequest['id'];
    await api.assignTaskToUser(config.judgeUserWithRegionId1, taskId);
  }
  await LRspec.decisionForReconsiderationNoOptionForAmending();
  if (config.runWAApiTest) {
    api.completeTaskByUser(config.judgeUserWithRegionId1, taskId);
  }
}).retry(2);

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
  await unAssignAllUsers();
});
