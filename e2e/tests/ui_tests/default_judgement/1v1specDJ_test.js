/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const testingSupport = require('../../../api/testingSupport.js');
const {checkToggleEnabled} = require('../../../api/testingSupport');
const {PBAv3} = require('../../../fixtures/featureKeys');
const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');

Feature('1v1 spec defaultJudgement @e2e-1v1-dj');

Scenario('DefaultJudgement @create-claim ', async ({I, api_spec}) => {

  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  const pbaV3 = await checkToggleEnabled(PBAv3);
  console.log('Is PBAv3 toggle on?: ' + pbaV3);
  let caseid = await api_spec.getCaseId();

  if (pbaV3) {
    await serviceRequest.payFee(caseid);
  }

  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);

  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(caseid, 'ONE_V_ONE');
}).retry(3);
