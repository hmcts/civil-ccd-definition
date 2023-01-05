/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const testingSupport = require('../../../api/testingSupport.js');
let caseId;

Feature('1v1 Unspec Case Notes');

Scenario('CaseNotes @create-claim @e2e-1v1-dj', async ({I, api}) => {
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
  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
  await I.waitForText('Summary');
  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/STANDARD_DIRECTION_ORDER_DJ/STANDARD_DIRECTION_ORDER_DJCaseManagementOrder');
  await I.wait(6000)
});
