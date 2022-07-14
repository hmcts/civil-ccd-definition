/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const testingSupport = require('../../../api/testingSupport.js');

Feature('1v1 spec defaultJudgement @e2e-1v1-dj');

Scenario('DefaultJudgement @create-claim ', async ({I, api_spec}) => {

  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  let caseid = await api_spec.getCaseId();
  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(caseid, 'ONE_V_ONE');
});
