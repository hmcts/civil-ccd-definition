const config = require('../../../config.js');
const {addUserCaseMapping} = require("../../../api/caseRoleAssignmentHelper");
const {assignCaseToLRSpecDefendant} = require('../../../api/testingSupport');

const claimant1 = {
  litigantInPerson: true
};

const claimant2 = {
  litigantInPerson: false
};

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};

const respondent2 = {
  represented: true,
  sameLegalRepresentativeAsRespondent1: false,
  representativeOrgNumber: 2
};

let caseNumber;

Feature('1v1 - Claim Journey and initiate SDO @e2e-sdo');

Scenario('Applicant solicitor creates claim @create-claim', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, null, respondent1, null);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
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

Feature('1v2 - Claim Journey and initiate SDO @e2e-sdo');

Scenario('Claimant solicitor raises a claim against 2 defendants who have different solicitors 1v2', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, null, respondent1, respondent2);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and allocate small claims track 1v2', async ({I}) => {
  await I.initiateSDO('yes', 'yes', null, null);
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and not allocate small claims track and orderType as disposal 1v2', async ({I}) => {
  await I.initiateSDO('yes', null, null, 'disposal');
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and not allocate small claims track and orderType as decideDamages 1v2', async ({I}) => {
  await I.initiateSDO('yes', null, null, 'decideDamages');
}).retry(3);

Scenario('Judge initiate SDO without entering damages and allocate small claims track', async ({I}) => {
  await I.initiateSDO(null, null, 'smallClaims', null);
}).retry(3);

Scenario('Judge initiate SDO without entering damages and allocate fast track', async ({I}) => {
  await I.initiateSDO(null, null, 'fastTrack', null);
}).retry(3);

Feature('2v1 - Claim Journey and initiate SDO @e2e-sdo');

Scenario('Claimant solicitor raises a claim for 2 claimants against 1 defendant', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, claimant2, respondent1, null);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and allocate small claims track 2v1', async ({I}) => {
  await I.initiateSDO('yes', 'yes', null, null);
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and not allocate small claims track and orderType as disposal 2v1', async ({I}) => {
  await I.initiateSDO('yes', null, null, 'disposal');
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and not allocate small claims track and orderType as decideDamages 2v1', async ({I}) => {
  await I.initiateSDO('yes', null, null, 'decideDamages');
}).retry(3);

Scenario('Judge initiate SDO without entering damages and allocate small claims track', async ({I}) => {
  await I.initiateSDO(null, null, 'smallClaims', null);
}).retry(3);

Scenario('Judge initiate SDO without entering damages and allocate fast track', async ({I}) => {
  await I.initiateSDO(null, null, 'fastTrack', null);
}).retry(3);

Feature('1v1 - Specified Claim Journey and initiate SDO @e2e-sdo');

Scenario('1v1 Applicant solicitor creates specified claim for fast track @create-claim-spec', async ({LRspec}) => {
  console.log('1v1 Applicant solicitor creates specified claim for fast track @create-claim-spec');
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('1v1 fast claim', 'organisation', null, 'company', null, 19000);
  caseNumber = await LRspec.grabCaseNumber();
}).retry(3);

Scenario('1v1 Specified Judge initiate SDO with sum of damages and allocate small claims track', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified('yes', 'yes', null, null);
}).retry(3);

Scenario('1v1 Specified Judge initiate SDO with sum of damages and not allocate small claims track and orderType as disposal', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified('yes', null, null, 'disposal');
}).retry(3);

Scenario('1v1 Specified Judge initiate SDO with sum of damages and not allocate small claims track and orderType as decideDamages', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified('yes', null, null, 'decideDamages');
}).retry(3);

Scenario('1v1 Specified Judge initiate SDO without entering damages and allocate small claims track', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified(null, null, 'smallClaims', null);
}).retry(3);

Scenario('1v1 Specified Judge initiate SDO without entering damages and allocate fast track', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified(null, null, 'fastTrack', null);
}).retry(3);

Feature('1v2 - Specified Claim Journey and initiate SDO @e2e-sdo');

Scenario('1v2 Applicant solicitor creates specified claim for fast track for SDO @create-claim-spec', async ({LRspec}) => {
  console.log('Applicant solicitor creates 1v2 specified claim both defendants Same LR for small claims @create-claim-spec');
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('1v2 Different LRs fast claim','organisation', null, respondent1, respondent2, 15450);
  caseNumber = await LRspec.grabCaseNumber();
  await LRspec.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario('1v2 Specified Judge initiate SDO with sum of damages and allocate small claims track', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified('yes', 'yes', null, null);
}).retry(3);

Scenario('1v2 Specified Judge initiate SDO with sum of damages and not allocate small claims track and orderType as disposal', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified('yes', null, null, 'disposal');
}).retry(3);

Scenario('1v2 Specified Judge initiate SDO with sum of damages and not allocate small claims track and orderType as decideDamages', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified('yes', null, null, 'decideDamages');
}).retry(3);

Scenario('1v2 Specified Judge initiate SDO without entering damages and allocate small claims track', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified(null, null, 'smallClaims', null);
}).retry(3);

Scenario('1v2 Specified Judge initiate SDO without entering damages and allocate fast track', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified(null, null, 'fastTrack', null);
}).retry(3);

Feature('2v1 - Specified Claim Journey and initiate SDO @e2e-sdo');

Scenario('2v1 Applicant solicitor creates specified claim for fast track for SDO @create-claim-spec', async ({LRspec}) => {
  console.log('Applicant solicitor creates 2v1 specified claim with 2 organisation vs 1 company for fast-track claims');
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('2v1 specified claim - fast track', 'organisation', 'organisation', 'company', null, 18000);
  caseNumber = await LRspec.grabCaseNumber();
}).retry(3);

Scenario('2v1 Specified Judge initiate SDO with sum of damages and allocate small claims track', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified('yes', 'yes', null, null);
}).retry(3);

Scenario('2v1 Specified Judge initiate SDO with sum of damages and not allocate small claims track and orderType as disposal', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified('yes', null, null, 'disposal');
}).retry(3);

Scenario('2v1 Specified Judge initiate SDO with sum of damages and not allocate small claims track and orderType as decideDamages', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified('yes', null, null, 'decideDamages');
}).retry(3);

Scenario('2v1 Specified Judge initiate SDO without entering damages and allocate small claims track', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified(null, null, 'smallClaims', null);
}).retry(3);

Scenario('2v1 Specified Judge initiate SDO without entering damages and allocate fast track', async ({LRspec}) => {
  await LRspec.initiateSDOSpecified(null, null, 'fastTrack', null);
}).retry(3);
