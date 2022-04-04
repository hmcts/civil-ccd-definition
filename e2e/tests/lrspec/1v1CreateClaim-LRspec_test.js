const config = require('../../config.js');
const {assignCaseToDefendantLRspec} = require('../../api/testingSupport');
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
const {assignCaseToDefendant} = require('../../api/testingSupport');

const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

let caseNumber;

Feature('Claim creation 1v1 @e2e-tests-spec');

Scenario.skip('1v1 Applicant solicitor creates specified claim for small claims @create-claim-spec', async ({I}) => {
  console.log('1v1 Applicant solicitor creates specified claim for small claims  @create-claim-spec');
  await I.login(config.applicantSolicitorUser);
  await I.createCaseSpecified('organisation', null , 'company', null  ,false, 19000);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario('1v1 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaimFullDefence({defendant1Response: 'fullDefence',claimType: 'fast', defenceType: 'dispute'});
  await I.see(caseEventMessage('Respond to claim'));
  await I.click('Sign out');
}).retry(3);

Scenario.skip('1v1 Respond To Claim - Defendants solicitor Part Admit the claim and defendant wants to pay by repaymentPlan', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaimPartAdmit({defendant1Response: 'partAdmission', claimType: 'fast', defenceType: 'repaymentPlan'});
  await I.see(caseEventMessage('Respond to claim'));
  await I.click('Sign out');
}).retry(3);

Scenario.skip('1v1 Respond To Claim - Defendants solicitor Admits the claim and defendant wants to pay by setDate', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaimFullAdmit({defendant1Response: 'fullAdmission', claimType: 'fast', defenceType: 'setDate'});
  await I.see(caseEventMessage('Respond to claim'));
  await I.click('Sign out');
}).retry(3);

