/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('1v1 spec defaultJudgement @e2e-1v1-dj @master-e2e-ft');

Scenario('DefaultJudgement @create-claim ', async ({I, api_spec, loginAs}) => {

  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  let caseid = await api_spec.getCaseId();
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);

  await loginAs('organisation1Solicitor1');
  await I.initiateDJSpec(caseid, 'ONE_V_ONE');
}).retry(3);

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
