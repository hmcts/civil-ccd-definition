/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
let caseId;

Feature('1v1 Unspec defaultJudgement');

Scenario('DefaultJudgement @create-claim @e2e-1v1-dj @e2e-wa @non-prod-e2e-ft', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  caseId = await api.getCaseId();

  //below amend claim documents only needed as assertion was failing on notify claims
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  await I.login(config.applicantSolicitorUser);
  await I.initiateDJUnspec(caseId, 'ONE_V_ONE');

  await I.login(config.judgeUserWithRegionId1);
  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
  await I.waitForText('Summary');
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/EVIDENCE_UPLOAD_JUDGE/EVIDENCE_UPLOAD_JUDGECaseNoteSelection');
    await I.waitForText('How do you want to add a case note?');
    await I.judgeAddsCaseNotes();
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
    await I.waitForText('Summary');
  }

  if (config.runWAApiTest) {
    const summaryJudgmentDirectionsTask = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.judgeUnspecDJTask);
    console.log('summaryJudgmentDirectionsTask...' , summaryJudgmentDirectionsTask);
  }

  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/STANDARD_DIRECTION_ORDER_DJ/STANDARD_DIRECTION_ORDER_DJCaseManagementOrder');
  await I.judgePerformDJDirectionOrder();
  if (config.runWAApiTest) {
    const caseProgressionTakeCaseOfflineTask = await api.retrieveTaskDetails(config.hearingCenterAdminWithRegionId1, caseId, config.waTaskIds.listingOfficerCaseProgressionTask);
    console.log('caseProgressionTakeCaseOfflineTask...' , caseProgressionTakeCaseOfflineTask);
  }

  await I.login(config.hearingCenterAdminWithRegionId1);
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
    await I.waitForText('Summary');
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId+ '/trigger/HEARING_SCHEDULED/HEARING_SCHEDULEDHearingNoticeSelect');
    await I.createHearingScheduled();
  }
  //await I.staffPerformDJCaseTransferCaseOffline(caseId);
}).retry(3);

Scenario('Verify Challenged access check for judge @e2e-wa @dmn-task', async ({I, WA}) => {
  await I.login(config.judgeUserWithRegionId2);
  await WA.runChallengedAccessSteps(caseId);
}).retry(3);

Scenario('Verify Challenged access check for admin @e2e-wa @dmn-task', async ({I, WA}) => {
  await I.login(config.hearingCenterAdminWithRegionId12);
  await WA.runChallengedAccessSteps(caseId);
}).retry(3);

Scenario('Verify Challenged access check for legalops @e2e-wa @dmn-task', async ({I, WA}) => {
  await I.login(config.tribunalCaseworkerWithRegionId12);
  await WA.runChallengedAccessSteps(caseId);
}).retry(3);

Scenario('Verify Specific access check for judge @e2e-wa', async ({I, WA, api}) => {
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
});

Scenario('Verify Specific access check for admin @e2e-wa', async ({I, WA, api}) => {
  await I.login(config.iacAdminUser);
   await WA.runSpecificAccessRequestSteps(caseId);
   if (config.runWAApiTest) {
     const sarTask = await api.retrieveTaskDetails(config.nbcTeamLeaderWithRegionId4, caseId, config.waTaskIds.reviewSpecificAccessRequestAdmin);
   } else {
     console.log('WA flag is not enabled');
     return;
   }
   await I.login(config.nbcTeamLeaderWithRegionId4);
   await WA.runSpecificAccessApprovalSteps(caseId);
   await I.login(config.iacAdminUser);
   await WA.verifyApprovedSpecificAccess(caseId);
 });

Scenario('Verify Specific access check for legalops @e2e-wa', async ({I, WA, api}) => {
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
});


Scenario('Verify Specific access check for CTSC @e2e-wa', async ({I, WA, api}) => {
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
});
