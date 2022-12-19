const config = require('../../../config.js');
const {checkToggleEnabled} = require('../../../api/testingSupport');
const {PBAv3} = require('../../../fixtures/featureKeys');
const apiRequest = require('../../../api/apiRequest');
const claimData = require('../../../fixtures/events/createClaim');

const claimant1 = {
  litigantInPerson: false
};
const respondent1 = {
  represented: false
};
const respondent2 = {
  sameLegalRepresentativeAsRespondent1: false,
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};

// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//let caseNumber;


Feature('1v2 Create claim @e2e-unspec @e2e-multiparty');

Scenario('Claimant solicitor raise a claim against 2 defendants, one of who is without a solicitor (LiP) should progress case offline', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(
    claimant1,
    null,
    respondent1,
    respondent2,
    false
  );

  const pbaV3 = await checkToggleEnabled(PBAv3);
  console.log('Is PBAv3 toggle on?: ' + pbaV3);

  if (pbaV3) {
    await apiRequest.paymentUpdate(caseId, '/service-request-update-claim-issued',
      claimData.serviceUpdateDto(caseId, 'paid'));
    console.log('Service request update sent to callback URL');
  }
  // Reinstate the lines below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //caseNumber = await I.grabCaseNumber();
  //await I.see(`Case ${caseNumber} has been created.`);
}).retry(3);

