const config = require('../../config.js');

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

Feature('2v1 Multi Party Claim Creation 2v1 @e2e-tests-spec');

Scenario('Applicant solicitor creates 2v1 specified claim with 2 organisation vs 1 company for fast-track claims', async ({I}) => {
  console.log('Applicant solicitor creates 2v1 specified claim with 2 organisation vs 1 company for fast-track claims');
  await I.login(config.applicantSolicitorUser);
  await I.createCaseSpecified('organisation', 'organisation', 'company', null, false, 18000);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);

}).retry(3);

Scenario('2v1 Defendant solicitor acknowledges claim-spec', async ({I}) => {
  console.log('2v1 Defendant solicitor acknowledges claim-spec: ' + caseId());
  await assignCaseToDefendant(caseId());
  await I.login(config.defendantSolicitorUser);
  await I.acknowledgeClaimSpec();
  await I.see(caseEventMessage('Acknowledgement of Service'));
}).retry(3);

Scenario.skip('2v1 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaimFullDefence({defendant1Response: 'fullDefence',claimType: 'fast', defenceType: 'dispute'});
  await I.see(caseEventMessage('Respond to claim'));
  await I.click('Sign out');
}).retry(3);

Scenario.skip('2v1 Respond To Claim - Defendants solicitor Part Admit the claim and defendant wants to pay by repaymentPlan', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaimPartAdmit({defendant1Response: 'partAdmission', claimType: 'fast', defenceType: 'repaymentPlan'});
  await I.see(caseEventMessage('Respond to claim'));
  await I.click('Sign out');
}).retry(3);

Scenario.skip('2v1 Respond To Claim - Defendants solicitor Admits the claim and defendant wants to pay by setDate', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaimFullAdmit({twoDefendants=false,defendant1Response: 'fullAdmission', claimType: 'fast', defenceType: 'setDate'});
  await I.see(caseEventMessage('Respond to claim'));
  await I.click('Sign out');
}).retry(3);