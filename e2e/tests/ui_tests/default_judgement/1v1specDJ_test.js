/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('1v1 spec defaultJudgement @e2e-1v1-dj @non-prod-e2e-ft');

Scenario('DefaultJudgement @create-claim ', async ({I, api_spec}) => {

  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  let caseid = await api_spec.getCaseId();
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);

  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(caseid, 'ONE_V_ONE');
}).retry(3);
