const config = require('../../../config.js');
const {assignCaseToLRSpecDefendant} = require('../../../api/testingSupport');

// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

let caseNumber;

Feature('2v1 Multi Party Claim Creation 2v1 @e2e-tests-spec');

Scenario('Applicant solicitor creates 2v1 specified claim with 2 organisation vs 1 company for fast-track claims', async ({LRspec}) => {
  console.log('Applicant solicitor creates 2v1 specified claim with 2 organisation vs 1 company for fast-track claims');
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('2v1 specified claim - fast track', 'organisation', 'organisation', 'company', null, 18000);
  caseNumber = await LRspec.grabCaseNumber();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario.skip('2v1 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({LRspec}) => {
  console.log('2v1 Defendant solicitor reject the specified claim');
  await assignCaseToLRSpecDefendant(caseId());
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    twoClaimants: true,
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);

Scenario.skip('2v1 Respond To Claim - Defendants solicitor Part Admit the claim and defendant wants to pay by repaymentPlan', async ({LRspec}) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimPartAdmit({
    defendant1Response: 'partAdmission',
    claimType: 'fast',
    defenceType: 'repaymentPlan'
  });
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);

Scenario.skip('2v1 Respond To Claim - Defendants solicitor Admits the claim and defendant wants to pay by setDate', async ({LRspec}) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullAdmit({
    twoDefendants: false,
    defendant1Response: 'fullAdmission',
    claimType: 'fast',
    defenceType: 'setDate'
  });
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);
