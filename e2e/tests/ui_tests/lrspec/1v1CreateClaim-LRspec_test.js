const config = require('../../../config.js');
const {assignCaseToLRSpecDefendant} = require('../../../api/testingSupport');
// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

let caseNumber;

Feature('Claim creation 1v1 @e2e-tests-spec');

Scenario('1v1 Applicant solicitor creates specified claim for fast track @create-claim-spec', async ({LRspec}) => {
  console.log('1v1 Applicant solicitor creates specified claim for fast track @create-claim-spec');
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('1v1 fast claim', 'organisation', null, 'company', null, 19000);
  caseNumber = await LRspec.grabCaseNumber();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(`Case ${caseNumber} has been created.`);
  await LRspec.click('Sign out');
}).retry(3);

Scenario('1v1 Claimant solicitor Enter Breathing Space', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.enterBreathingSpace();
  await LRspec.click('Sign out');
}).retry(3);

Scenario('1v1 Claimant solicitor Lift Breathing Space', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.liftBreathingSpace();
  await LRspec.click('Sign out');
}).retry(3);

Scenario.skip('1v1 Defendant solicitor perform Inform Agreed Extension', async ({LRspec}) => {
  console.log('1v1 Defendant solicitor Inform Agreed Extension claim-spec: ' + caseId());
  await assignCaseToLRSpecDefendant(caseId());
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.informAgreedExtensionDateSpec();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Inform agreed extension date'));
}).retry(3);

Scenario.skip('1v1 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({LRspec}) => {
  await assignCaseToLRSpecDefendant(caseId());
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Respond to claim'));
  //await waitForFinishedBusinessProcess(caseId());
  await LRspec.click('Sign out');
}).retry(3);


Scenario.skip('1v1 Claimant solicitor responds to defence - claimant Intention to proceed', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.respondToDefence({mpScenario: 'ONE_V_ONE', claimType: 'fast'});
  await LRspec.click('Sign out');
}).retry(3);


Scenario.skip('1v1 Respond To Claim - Defendants solicitor Part Admit the claim and defendant wants to pay by repaymentPlan', async (LRspec) => {
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

Scenario.skip('1v1 Respond To Claim - Defendants solicitor Admits the claim and defendant wants to pay by setDate', async ({LRspec}) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullAdmit({
    defendant1Response: 'fullAdmission',
    claimType: 'fast',
    defenceType: 'setDate'
  });
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);

