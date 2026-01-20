const config = require('../../../config.js');
const multiTrackClaimAmount = '200001';
const mintiEnabled = true;
const track = 'MULTI_CLAIM';
const judgeUser = config.judgeUserWithRegionId1;
const hearingCenterAdminToBeUsed = config.hearingCenterAdminWithRegionId1;
let caseId, taskId, intermediateTrackOrderMadeReviewCaseExpectedTask, multiTrackDirectionsExpectedTask;

if (config.runWAApiTest) {
  multiTrackDirectionsExpectedTask = require('../../../../wa/tasks/multiTrackDirectionsTask.js');
  intermediateTrackOrderMadeReviewCaseExpectedTask = require('../../../../wa/tasks/intermediateTrackOrderMadeReviewCaseTask.js');
}
Feature('Unspec multi track journey').tag('@api-multi-intermediate-unspec @api-nightly-prod');

Scenario('01 1v1 unspec multi track claim', async ({api, WA}) => {
  const mpScenario = 'ONE_V_ONE';
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, multiTrackClaimAmount, mintiEnabled);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', track);
  caseId = await api.getCaseId();
  if (config.runWAApiTest && WA) {
    const multiTrackDirections = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.multiTrackDirections);
    console.log('multiTrackDirections...', multiTrackDirections);
    WA.validateTaskInfo(multiTrackDirections, multiTrackDirectionsExpectedTask);
    taskId = multiTrackDirections['id'];
    api.assignTaskToUser(config.judgeUserWithRegionId1, taskId);
  }
  await api.createFinalOrder(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'MULTI');
  await api.evidenceUploadApplicant(config.applicantSolicitorUser, mpScenario);
  if (config.runWAApiTest && WA) {
    const multiTrackOrderMakeReview = await api.retrieveTaskDetails(config.hearingCenterAdminWithRegionId1, caseId, config.waTaskIds.multiTrackOrderMadeReview);
    console.log('multiTrackOrderMakeReview...', multiTrackOrderMakeReview);
    WA.validateTaskInfo(multiTrackOrderMakeReview, intermediateTrackOrderMadeReviewCaseExpectedTask);
    taskId = multiTrackOrderMakeReview['id'];
    api.assignTaskToUser(config.hearingCenterAdminWithRegionId1, taskId);
  }
  await api.scheduleHearing(hearingCenterAdminToBeUsed, 'FAST_TRACK_TRIAL', true);
}).tag('@api-prod');

Scenario('02 1v2DS unspec multi track claim', async ({ api, WA }) => {
  const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, multiTrackClaimAmount, mintiEnabled);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', track);
  caseId = await api.getCaseId();
  if (config.runWAApiTest && WA) {
    const multiTrackDirections = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.multiTrackDirections);
    console.log('multiTrackDirections...', multiTrackDirections);
    WA.validateTaskInfo(multiTrackDirections, multiTrackDirectionsExpectedTask);
    taskId = multiTrackDirections['id'];
    api.assignTaskToUser(config.judgeUserWithRegionId1, taskId);
  }
  await api.createFinalOrder(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'MULTI');
  await api.evidenceUploadApplicant(config.applicantSolicitorUser, mpScenario);
  if (config.runWAApiTest && WA) {
    const multiTrackOrderMakeReview = await api.retrieveTaskDetails(config.hearingCenterAdminWithRegionId1, caseId, config.waTaskIds.multiTrackOrderMadeReview);
    console.log('multiTrackOrderMakeReview...', multiTrackOrderMakeReview);
    WA.validateTaskInfo(multiTrackOrderMakeReview, intermediateTrackOrderMadeReviewCaseExpectedTask);
    taskId = multiTrackOrderMakeReview['id'];
    api.assignTaskToUser(config.hearingCenterAdminWithRegionId1, taskId);
  }
  await api.scheduleHearing(hearingCenterAdminToBeUsed, 'FAST_TRACK_TRIAL', true);
});

Scenario('03 1v2SS unspec multi track claim', async ({ api, WA }) => {
  const mpScenario = 'ONE_V_TWO_ONE_LEGAL_REP';
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, multiTrackClaimAmount, mintiEnabled);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', track);
  caseId = await api.getCaseId();
  if (config.runWAApiTest && WA) {
    const multiTrackDirections = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.multiTrackDirections);
    console.log('multiTrackDirections...', multiTrackDirections);
    WA.validateTaskInfo(multiTrackDirections, multiTrackDirectionsExpectedTask);
    taskId = multiTrackDirections['id'];
    api.assignTaskToUser(config.judgeUserWithRegionId1, taskId);
  }
  await api.createFinalOrder(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'MULTI');
  await api.evidenceUploadApplicant(config.applicantSolicitorUser, mpScenario);
  if (config.runWAApiTest && WA) {
    const multiTrackOrderMakeReview = await api.retrieveTaskDetails(config.hearingCenterAdminWithRegionId1, caseId, config.waTaskIds.multiTrackOrderMadeReview);
    console.log('multiTrackOrderMakeReview...', multiTrackOrderMakeReview);
    WA.validateTaskInfo(multiTrackOrderMakeReview, intermediateTrackOrderMadeReviewCaseExpectedTask);
    taskId = multiTrackOrderMakeReview['id'];
    api.assignTaskToUser(config.hearingCenterAdminWithRegionId1, taskId);
  }
  await api.scheduleHearing(hearingCenterAdminToBeUsed, 'FAST_TRACK_TRIAL', true);
});

Scenario('04 2v1 unspec multi track claim', async ({ api, WA }) => {
  const mpScenario = 'TWO_V_ONE';
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, multiTrackClaimAmount, mintiEnabled);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', track);
  caseId = await api.getCaseId();
  if (config.runWAApiTest) {
    const multiTrackDirections = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.multiTrackDirections);
    console.log('multiTrackDirections...', multiTrackDirections);
    WA.validateTaskInfo(multiTrackDirections, multiTrackDirectionsExpectedTask);
    taskId = multiTrackDirections['id'];
    api.assignTaskToUser(config.judgeUserWithRegionId1, taskId);
  }
  await api.createFinalOrder(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'MULTI');
  await api.evidenceUploadApplicant(config.applicantSolicitorUser, mpScenario);
  if (config.runWAApiTest) {
    const multiTrackOrderMakeReview = await api.retrieveTaskDetails(config.hearingCenterAdminWithRegionId1, caseId, config.waTaskIds.multiTrackOrderMadeReview);
    console.log('multiTrackOrderMakeReview...', multiTrackOrderMakeReview);
    WA.validateTaskInfo(multiTrackOrderMakeReview, intermediateTrackOrderMadeReviewCaseExpectedTask);
    taskId = multiTrackOrderMakeReview['id'];
    api.assignTaskToUser(config.hearingCenterAdminWithRegionId1, taskId);
  }
  await api.scheduleHearing(hearingCenterAdminToBeUsed, 'FAST_TRACK_TRIAL', true);
}).tag('@api-prod');

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
