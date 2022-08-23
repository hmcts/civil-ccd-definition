const config = require('../../../config.js');

const claimant1 = {
  litigantInPerson: true
};

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};

// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//let caseNumber;

Feature('1v1 - Claim Journey and initiate SDO @e2e-sdo');

Scenario('Applicant solicitor creates claim @create-claim', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, null, respondent1, null);
  // Reinstate the lines below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //caseNumber = await I.grabCaseNumber();
  //await I.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and allocate small claims track', async ({I}) => {
  await I.initiateSDO('yes', 'yes', null, null);
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and not allocate small claims track and orderType as disposal', async ({I}) => {
  await I.initiateSDO('yes', null, null, 'disposal');
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and not allocate small claims track and orderType as decideDamages', async ({I}) => {
  await I.initiateSDO('yes', null, null, 'decideDamages');
}).retry(3);

Scenario('Judge initiate SDO without entering damages and allocate small claims track', async ({I}) => {
  await I.initiateSDO(null, null, 'smallClaims', null);
}).retry(3);

Scenario('Judge initiate SDO without entering damages and allocate fast track', async ({I}) => {
  await I.initiateSDO(null, null, 'fastTrack', null);
}).retry(3);
