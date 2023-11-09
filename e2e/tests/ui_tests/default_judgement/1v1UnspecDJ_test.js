/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
let caseId, taskId, hearingDateIsLessThan3Weeks;
const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');
const { checkToggleEnabled } = require('../../../api/testingSupport');
const {PBAv3} = require('../../../fixtures/featureKeys');

Feature('1v1 Unspec defaultJudgement');

Scenario.skip('Request default judgement @create-claim @e2e-1v1-dj @e2e-wa @master-e2e-ft @wa-r4', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  caseId = await api.getCaseId();

  //below amend claim documents only needed as assertion was failing on notify claims
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);

  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  await I.login(config.applicantSolicitorUser);
  await I.initiateDJUnspec(caseId, 'ONE_V_ONE');
}).retry(3);


Scenario.skip('Judge add casee notes @create-claim @e2e-1v1-dj @e2e-wa @master-e2e-ft @wa-r4', async ({I, api}) => {
  await I.login(config.judgeUser2WithRegionId4);
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
    await I.waitForText('Summary');
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/EVIDENCE_UPLOAD_JUDGE/EVIDENCE_UPLOAD_JUDGECaseNoteSelection');
    await I.waitForText('How do you want to add a case note?');
    await I.judgeAddsCaseNotes();
  }
}).retry(3);

Scenario.skip('Judge perform direction order @create-claim @e2e-1v1-dj @e2e-wa @master-e2e-ft @wa-r4', async ({I, api}) => {
  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
  await I.waitForText('Summary');
  if (config.runWAApiTest) {
    const summaryJudgmentDirectionsTask = await api.retrieveTaskDetails(config.judgeUser2WithRegionId4, caseId, config.waTaskIds.judgeUnspecDJTask);
    console.log('summaryJudgmentDirectionsTask...' , summaryJudgmentDirectionsTask);
    taskId = summaryJudgmentDirectionsTask['id'];
    api.assignTaskToUser(config.judgeUser2WithRegionId4, taskId);
  }

  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/STANDARD_DIRECTION_ORDER_DJ/STANDARD_DIRECTION_ORDER_DJCaseManagementOrder');
  await I.judgePerformDJDirectionOrder();
  if (config.runWAApiTest) {
    api.completeTaskByUser(config.judgeUser2WithRegionId4, taskId);
  }
  await I.click('Sign out');
}).retry(3);

Scenario.skip('Hearing schedule @create-claim @e2e-1v1-dj @e2e-wa @master-e2e-ft @wa-r4', async ({I, api}) => {
  if (['preview', 'demo'  ].includes(config.runningEnv)) {
    await createHearingScheduled(I);
  } else {
    if (config.runWAApiTest) {
      const caseProgressionTakeCaseOfflineTask = await api.retrieveTaskDetails(config.hearingCenterAdminWithRegionId4, caseId, config.waTaskIds.listingOfficerCaseProgressionTask);
      console.log('caseProgressionTakeCaseOfflineTask...' , caseProgressionTakeCaseOfflineTask);
      taskId = caseProgressionTakeCaseOfflineTask['id'];
    }
    await I.login(config.hearingCenterAdminWithRegionId4);
    await api.assignTaskToUser(config.hearingCenterAdminWithRegionId4, taskId);
    await I.staffPerformDJCaseTransferCaseOffline(caseId);
    await api.completeTaskByUser(config.judgeUser2WithRegionId4, taskId);
  }
}).retry(3);

Scenario.skip('Verify error on trial readiness @create-claim @e2e-1v1-dj @e2e-wa @master-e2e-ft @wa-r4', async ({I, api}) => {
  if (['preview', 'demo'  ].includes(config.runningEnv)) {
    await api.amendHearingDate(config.systemupdate, '2022-01-10');
    hearingDateIsLessThan3Weeks = true;
    await performConfirmTrialReadiness(I, config.defendantSolicitorUser, 'yes');
  }
}).retry(3);

Scenario.skip('Confirm trial readiness @create-claim @e2e-1v1-dj @e2e-wa @master-e2e-ft @wa-r4', async ({I, api}) => {
  if (['preview', 'demo'  ].includes(config.runningEnv)) {
    await api.amendHearingDate(config.systemupdate, '2025-01-10');
    hearingDateIsLessThan3Weeks = false;
    await performConfirmTrialReadiness(I, config.applicantSolicitorUser, hearingDateIsLessThan3Weeks, 'no');
    await performConfirmTrialReadiness(I, config.defendantSolicitorUser, hearingDateIsLessThan3Weeks, 'yes');
  }
}).retry(3);

Scenario.skip('Pay hearing fee @create-claim @e2e-1v1-dj @e2e-wa @master-e2e-ft @wa-r4', async ({I}) => {
  if (['preview', 'demo'  ].includes(config.runningEnv)) {
    await payHearingFee(I);
  }
}).retry(3);

async function createHearingScheduled(I) {
    await I.login(config.hearingCenterAdminWithRegionId4);
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
    await I.waitForText('Summary');
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId+ '/trigger/HEARING_SCHEDULED/HEARING_SCHEDULEDHearingNoticeSelect');
    await I.createHearingScheduled();
}

async function performConfirmTrialReadiness(I, user = config.applicantSolicitorUser, readyForTrial = 'yes') {
    await I.login(user);
    console.log('value of hearingDateIsLessThan3Weeks..', hearingDateIsLessThan3Weeks);
    await I.confirmTrialReadiness(user, hearingDateIsLessThan3Weeks, readyForTrial);
}

async function payHearingFee(I, user = config.applicantSolicitorUser) {
  await I.login(user);
  const pbaV3 = await checkToggleEnabled(PBAv3);
  if (pbaV3) {
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
    await serviceRequest.openServiceRequestTab();
    await serviceRequest.payFee(caseId, true);
  }
}

Scenario.skip('Verify Challenged access check for judge @e2e-wa', async ({I, WA}) => {
  await I.login(config.judgeUserWithRegionId2);
  await WA.runChallengedAccessSteps(caseId);
}).retry(3);

Scenario.skip('Verify Challenged access check for admin @e2e-wa', async ({I, WA}) => {
  await I.login(config.hearingCenterAdminWithRegionId12);
  await WA.runChallengedAccessSteps(caseId);
}).retry(3);

Scenario.skip('Verify Challenged access check for legalops @e2e-wa @wa-r4', async ({I, WA}) => {
  await I.login(config.tribunalCaseworkerWithRegionId4);
  await WA.runChallengedAccessSteps(caseId);
}).retry(3);

Scenario.skip('Verify Specific access check for judge @e2e-wa', async ({I, WA, api}) => {
  await I.login(config.iacLeadershipJudge);
  await WA.runSpecificAccessRequestSteps(caseId);
  if (config.runWAApiTest) {
    const sarTask = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.reviewSpecificAccessRequestJudiciary);
  } else {
    console.log('WA flag is not enabled');
    return;
  }
  await I.login(config.judgeUserWithRegionId1);
  await WA.runSpecificAccessApprovalSteps(caseId);
  await I.login(config.iacLeadershipJudge);
  await WA.verifyApprovedSpecificAccess(caseId);
}).retry(3);

Scenario.skip('Request Specific access check for admin @e2e-wa  @wa-r4', async ({I, WA, api}) => {
   let userToBeLoggedIn = config.runningEnv == 'demo' ? config.iacAdminUser : config.iacAATAdminUser;
   await I.login(userToBeLoggedIn);
   await WA.runSpecificAccessRequestSteps(caseId);
 }).retry(3);

 Scenario.skip('Approve Specific access check for admin @e2e-wa  @wa-r4', async ({I, WA, api}) => {
  if (config.runWAApiTest) {
    const sarTask = await api.retrieveTaskDetails(config.nbcTeamLeaderWithRegionId1, caseId, config.waTaskIds.reviewSpecificAccessRequestAdmin);
  } else {
    console.log('WA flag is not enabled');
    return;
  }
  await I.login(config.nbcTeamLeaderWithRegionId1);
  await WA.runSpecificAccessApprovalSteps(caseId);
}).retry(3);

Scenario.skip('Verify approved Specific access check for admin @e2e-wa  @wa-r4', async ({I, WA, api}) => {
  let userToBeLoggedIn = config.runningEnv == 'demo' ? config.iacAdminUser : config.iacAATAdminUser;
  await I.login(userToBeLoggedIn);
  await WA.verifyApprovedSpecificAccess(caseId);
}).retry(3);

Scenario.skip('Verify Specific access check for legalops @e2e-wa', async ({I, WA, api}) => {
  await I.login(config.iacLegalOpsUser);
  await WA.runSpecificAccessRequestSteps(caseId);
  if (config.runWAApiTest) {
    const sarTask = await api.retrieveTaskDetails(config.seniorTBCWWithRegionId4, caseId, config.waTaskIds.reviewSpecificAccessRequestLegalOps);
  } else {
    console.log('WA flag is not enabled');
    return;
  }
  await I.login(config.seniorTBCWWithRegionId4);
  await WA.runSpecificAccessApprovalSteps(caseId);
  await I.login(config.iacLegalOpsUser);
  await WA.verifyApprovedSpecificAccess(caseId);
}).retry(3);


Scenario.skip('Verify Specific access check for CTSC @e2e-wa', async ({I, WA, api}) => {
  await I.login(config.iacCtscTeamLeaderUser);
  await WA.runSpecificAccessRequestSteps(caseId);
  if (config.runWAApiTest) {
    const sarTask = await api.retrieveTaskDetails(config.ctscTeamLeaderUser, caseId, config.waTaskIds.reviewSpecificAccessRequestCTSC);
  } else {
    console.log('WA flag is not enabled');
    return;
  }
  await I.login(config.ctscTeamLeaderUser);
  await WA.runSpecificAccessApprovalSteps(caseId);
  await I.login(config.iacCtscTeamLeaderUser);
  await WA.verifyApprovedSpecificAccess(caseId);
}).retry(3);

Scenario.skip('Verify Staff UI @e2e-wa @wa-r4', async ({I, WA, api}) => {
  await I.login(config.staffUIAdmin);
  await WA.verifyStaffLink();
}).retry(3);

Scenario.skip('Verify Judicial booking UI  @e2e-wa @wa-r4', async ({I, WA, api}) => {
  await I.login(config.feePaidJudge);
  await WA.createBooking('Central London County Court');
  await WA.createBooking('Liverpool Civil and Family Court');
  await WA.verifyCreatedBooking('Central London County Court');
  await WA.verifyCreatedBooking('Liverpool Civil and Family Court');
}).retry(3);

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
