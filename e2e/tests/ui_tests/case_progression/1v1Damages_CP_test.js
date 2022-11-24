const config = require('../../../config.js');
const {assignCaseRoleToUser, unAssignAllUsers, addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const {waitForFinishedBusinessProcess} = require('../../../api/testingSupport');

// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const claimant1 = {
  litigantInPerson: true
};

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};

let caseNumber;

Feature('1v1 - Claim Journey ');

Scenario('Applicant solicitor creates claim @create-claim', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, null, respondent1, null);
  caseNumber = await I.grabCaseNumber();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(`Case ${caseNumber} has been created.`);
  await addUserCaseMapping(caseId(),config.applicantSolicitorUser);
}).retry(3);

Scenario('Applicant solicitor notifies defendant solicitor of claim', async ({I}) => {
  await I.notifyClaim();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Notify claim'));
  await assignCaseRoleToUser(caseId(), 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
}).retry(3);

Scenario('Applicant solicitor notifies defendant solicitor of claim details', async ({I}) => {
  await I.notifyClaimDetails();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Notify claim details'));
  await I.click('Sign out');
}).retry(3);

Scenario('Claimant solicitor responds to defence', async ({I}) => {
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
      const caseProgressionTakeCaseOfflineTask = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.listingOfficerCaseProgressionTask);
      console.log('caseProgressionTakeCaseOfflineTask...' , caseProgressionTakeCaseOfflineTask);
    }
    await I.login(config.hearingCenterAdminWithRegionId4);
    await I.staffPerformDJCaseTransferCaseOffline(caseId);
}).retry(3);

Scenario('Verify Challenged access check for judge @e2e-wa', async ({I, WA}) => {
  await I.login(config.judgeUserWithRegionId2);
  await WA.runChallengedAccessSteps(caseId);
}).retry(3);

Scenario('Verify Challenged access check for admin @e2e-wa', async ({I, WA}) => {
  await I.login(config.hearingCenterAdminWithRegionId12);
  await WA.runChallengedAccessSteps(caseId);
}).retry(3);

Scenario('Verify Challenged access check for legalops @e2e-wa', async ({I, WA}) => {
  await I.login(config.tribunalCaseworkerWithRegionId12);
  await WA.runChallengedAccessSteps(caseId);
}).retry(3);