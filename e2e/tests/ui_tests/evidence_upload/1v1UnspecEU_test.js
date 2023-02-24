/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';
const judgeUser = config.judgeUserWithRegionId1;
let caseId;

Feature('1v1 Unspec evidenceUpload');

Scenario('EvidenceUpload @e2e-eu', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');
  await api.createSDO(judgeUser, 'CREATE_FAST_NO_SUM');

  caseId = await api.getCaseId();
  await I.login(config.applicantSolicitorUser);
  await I.evidenceUpload(caseId);
}).retry(3);

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
