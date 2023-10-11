/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('1v2 spec defaultJudgement @e2e-spec-dj-1v2DS @e2e-nightly-prod @e2e-regression');

Scenario('DefaultJudgement @create-claim ', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');

  let caseid = await api_spec.getCaseId();

  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(caseid, 'ONE_V_TWO');
}).retry(3);

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
