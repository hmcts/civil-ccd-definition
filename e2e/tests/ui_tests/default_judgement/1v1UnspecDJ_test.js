/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
let caseId;

Feature('1v1 Unspec defaultJudgement');

Scenario('DefaultJudgement @create-claim @e2e-1v1-dj @e2e-wa', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  caseId = await api.getCaseId();

  //below amend claim documents only needed as assertion was failing on notify claims
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  await I.login(config.applicantSolicitorUser);
  await I.initiateDJUnspec(caseId, 'ONE_V_ONE');

  if (config.runWAApiTest) {
    const summaryJudgmentDirectionsTask = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.judgeUnspecDJTask);
    console.log('summaryJudgmentDirectionsTask...' , summaryJudgmentDirectionsTask);
  }
  await I.login(config.judgeUserWithRegionId1);
  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
  await I.waitForText('Summary');
  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/STANDARD_DIRECTION_ORDER_DJ/STANDARD_DIRECTION_ORDER_DJCaseManagementOrder');
  await I.judgePerformDJDirectionOrder();
  if (config.runWAApiTest) {
    const caseProgressionTakeCaseOfflineTask = await api.retrieveTaskDetails(config.hearingCenterAdminWithRegionId4, caseId, config.waTaskIds.listingOfficerCaseProgressionTask);
    console.log('caseProgressionTakeCaseOfflineTask...' , caseProgressionTakeCaseOfflineTask);
  }
  await I.login(config.hearingCenterAdminWithRegionId4);
  await I.staffPerformDJCaseTransferCaseOffline(caseId);
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
