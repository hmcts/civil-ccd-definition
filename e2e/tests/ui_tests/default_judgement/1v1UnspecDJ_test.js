/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const testingSupport = require('../../../api/testingSupport.js');

Feature('1v1 Unspec defaultJudgement @e2e-1v1-dj');

Scenario('DefaultJudgement @create-claim ', async ({I, api}) => {

  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  //below amend claim documents only needed as assertion was failing on notify claims
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  let caseid = await api.getCaseId();
  await I.login(config.applicantSolicitorUser);
  await I.initiateDJUnspec(caseid, 'ONE_V_ONE');
});

