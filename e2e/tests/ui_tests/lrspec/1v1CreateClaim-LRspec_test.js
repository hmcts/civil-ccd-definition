const config = require('../../../config.js');
const {assignCaseToLRSpecDefendant} = require('../../../api/testingSupport');
const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

let caseNumber;

Feature('Claim creation 1v1 @e2e-tests-spec');

Scenario('1v1 Applicant solicitor creates specified claim for fast track @create-claim-spec', async ({LRspec}) => {
  console.log('1v1 Applicant solicitor creates specified claim for fast track @create-claim-spec');
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('organisation', null , 'company', null , 19000);
  caseNumber = await LRspec.grabCaseNumber();
  await LRspec.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario('1v1 Defendant solicitor acknowledges claim-spec', async ({LRspec}) => {
  console.log('1v1 Defendant solicitor acknowledges claim-spec: ' + caseId());
  await assignCaseToLRSpecDefendant(caseId());
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.acknowledgeClaimSpec();
  await LRspec.see(caseEventMessage('Acknowledgement of Service'));
}).retry(3);

Scenario('1v1 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({LRspec}) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({defendant1Response: 'fullDefence',claimType: 'fast', defenceType: 'dispute'});
  await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);

Scenario.skip('1v1 Respond To Claim - Defendants solicitor Part Admit the claim and defendant wants to pay by repaymentPlan', async (LRspec) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimPartAdmit({defendant1Response: 'partAdmission', claimType: 'fast', defenceType: 'repaymentPlan'});
  await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);

Scenario.skip('1v1 Respond To Claim - Defendants solicitor Admits the claim and defendant wants to pay by setDate', async ({LRspec}) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullAdmit({defendant1Response: 'fullAdmission', claimType: 'fast', defenceType: 'setDate'});
  await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);

