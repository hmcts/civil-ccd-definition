const config = require('../../../config.js');
const {assignCaseToLRSpecDefendant} = require('../../../api/testingSupport');

const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

let caseNumber;

Feature('Claim creation 1v2 Same Solicitor with Small claims @e2e-tests-spec');

Scenario('Applicant solicitor creates 1v2 specified claim both defendants same LR for small claims @create-claim-spec', async ({LRspec}) => {
  console.log('Applicant solicitor creates 1v2 specified claim both defendants Same LR for small claims @create-claim-spec');
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('organisation', null, 'company', 'company', 1000);
  caseNumber = await LRspec.grabCaseNumber();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario.skip('1v2 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({LRspec}) => {
  console.log('1v2 Defendant solicitor reject the specified claim');
  await assignCaseToLRSpecDefendant(caseId());
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    twoDefendants: true,
    defendant1Response: 'fullDefence',
    claimType: 'small',
    defenceType: 'dispute'
  });
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);

Scenario.skip('1v2 Respond To Claim - Defendants solicitor Part Admit the claim and defendant wants to pay by repaymentPlan', async ({LRspec}) => {
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

Scenario.skip('1v2 Respond To Claim - Defendants solicitor Admits the claim and defendant wants to pay by setDate', async (LRspec) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullAdmit({
    twoDefendants: true,
    defendant1Response: 'fullAdmission',
    claimType: 'fast',
    defenceType: 'setDate'
  });
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);
