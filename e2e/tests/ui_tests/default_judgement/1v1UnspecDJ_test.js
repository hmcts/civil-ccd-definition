/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const testingSupport = require('../../../api/testingSupport.js');
let caseId='1666077517232394';

Feature('1v1 Unspec defaultJudgement');

xScenario('DefaultJudgement @create-claim @e2e-dj-1v1 @e2e-wa', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  //below amend claim documents only needed as assertion was failing on notify claims
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  caseId = await api.getCaseId();
  await I.login(config.applicantSolicitorUser);
  await I.initiateDJUnspec(caseId, 'ONE_V_ONE');

  if (config.runWAApiTest) {
    const summaryJudgmentDirectionsTask = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.judgeUnspecDJTask);
    console.log('summaryJudgmentDirectionsTask...' , summaryJudgmentDirectionsTask);
  }
  await I.login(config.judgeUserWithRegionId1);
  await I.amOnPage(config.url.manageCase + 'cases/case-details/' + caseId);
  await I.waitForText('Summary');
  await I.amOnPage(config.url.manageCase + 'cases/case-details/' + caseId + '/trigger/STANDARD_DIRECTION_ORDER_DJ/STANDARD_DIRECTION_ORDER_DJCaseManagementOrder');
  await I.judgePerformDJDirectionOrder();
  if (config.runWAApiTest) {
    const caseProgressionTakeCaseOfflineTask = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.listingOfficerCaseProgressionTask);
    console.log('caseProgressionTakeCaseOfflineTask...' , caseProgressionTakeCaseOfflineTask);
  }
  await I.login(config.hearingCenterAdminWithRegionId4);
  await I.staffPerformDJCaseTransferCaseOffline(caseId);
});

xScenario('Verify Challenged access check for judge @e2e-wa', async ({I, WA}) => {
  await I.login(config.judgeUserWithRegionId2);
  await WA.runChallengedAccessSteps(caseId);
});

xScenario('Verify Challenged access check for admin @e2e-wa', async ({I, WA}) => {
  await I.login(config.hearingCenterAdminWithRegionId12);
  await WA.runChallengedAccessSteps(caseId);
});

xScenario('Verify Challenged access check for legalops @e2e-wa', async ({I, WA}) => {
  await I.login(config.tribunalCaseworkerWithRegionId12);
  await WA.runChallengedAccessSteps(caseId);
});

xScenario('Verify Specific access check for judge @e2e-wa', async ({I, WA, api}) => {
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
  await I.login(config.iacAdminUser);
  await WA.verifyApprovedSpecificAccess(caseId);
});

xScenario('Verify Specific access check for admin @e2e-wa', async ({I, WA, api}) => {
 /* await I.login(config.iacAdminUser);
  await WA.runSpecificAccessRequestSteps(caseId);
  console.log('i am done1');
  if (config.runWAApiTest) {
    console.log('api test...');
    const sarTask = await api.retrieveTaskDetails(config.nbcTeamLeaderWithRegionId4, caseId, config.waTaskIds.reviewSpecificAccessRequestAdmin);
  } else {
    console.log('WA flag is not enabled');
    return;
  }*/
  console.log('i am here');
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
