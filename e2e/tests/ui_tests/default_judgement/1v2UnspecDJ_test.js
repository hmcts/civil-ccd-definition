/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const testingSupport = require('../../../api/testingSupport.js');
const {checkToggleEnabled} = require('../../../api/testingSupport');
const {PBAv3} = require('../../../fixtures/featureKeys');
const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');

Feature('1v2 Unspec defaultJudgement @e2e-dj');

Scenario('DefaultJudgement @create-claim ', async ({I, api}) => {

  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
  let caseid = await api.getCaseId();
  const pbaV3 = await checkToggleEnabled(PBAv3);
  console.log('Is PBAv3 toggle on?: ' + pbaV3);

  if (pbaV3) {
    await serviceRequest.payFee(caseid);
  }

  //below amend claim documents only needed as assertion was failing on notify claims
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  await api.amendRespondent2ResponseDeadline(config.systemupdate);
  await I.login(config.applicantSolicitorUser);
  await I.initiateDJUnspec(caseid, 'ONE_V_TWO');
}).retry(3);
