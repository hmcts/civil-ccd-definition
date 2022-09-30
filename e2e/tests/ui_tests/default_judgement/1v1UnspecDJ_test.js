/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const testingSupport = require('../../../api/testingSupport.js');

Feature('1v1 Unspec defaultJudgement @e2e-dj-1v1 @e2e-wa');

Scenario('DefaultJudgement @create-claim ', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  //below amend claim documents only needed as assertion was failing on notify claims
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  const caseId = await api.getCaseId();
  const caseRefNum = await api.getLegacyCaseReference();
  await I.login(config.applicantSolicitorUser);
  await I.initiateDJUnspec(caseId, 'ONE_V_ONE');

  if (config.runWAApiTest) {
    const summaryJudgmentDirectionsTask = await api.retrieveTaskDetails(config.judgeUser, caseId, config.waTaskIds.judgeUnspecDJTask);
    console.log('summaryJudgmentDirectionsTask...' , summaryJudgmentDirectionsTask);
  }
  await I.login(config.judgeUser);
  await I.amOnPage(config.url.manageCase + 'cases/case-details/' + caseId);
  await I.waitForText('Summary');
  await I.amOnPage(config.url.manageCase + 'cases/case-details/' + caseId + '/trigger/STANDARD_DIRECTION_ORDER_DJ/STANDARD_DIRECTION_ORDER_DJCaseManagementOrder');
  await I.judgePerformDJDirectionOrder(caseRefNum);
  if (config.runWAApiTest) {
    const caseProgressionTakeCaseOfflineTask = await api.retrieveTaskDetails(config.judgeUser, caseId, config.waTaskIds.listingOfficerCaseProgressionTask);
    console.log('caseProgressionTakeCaseOfflineTask...' , caseProgressionTakeCaseOfflineTask);
  }
});

