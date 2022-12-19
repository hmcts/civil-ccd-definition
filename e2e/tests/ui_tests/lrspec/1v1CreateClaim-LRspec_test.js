const config = require('../../../config.js');
const {assignCaseToLRSpecDefendant, checkToggleEnabled, waitForFinishedBusinessProcess} = require('../../../api/testingSupport');
const {addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const {PBAv3} = require('../../../fixtures/featureKeys');
const apiRequest = require('../../../api/apiRequest');
const claimData = require('../../../fixtures/events/createClaim');
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

  const pbaV3 = await checkToggleEnabled(PBAv3);
  console.log('Is PBAv3 toggle on?: ' + pbaV3);

  if (pbaV3) {
    await waitForFinishedBusinessProcess(caseId);
    await apiRequest.paymentUpdate(caseId, '/service-request-update-claim-issued',
      claimData.serviceUpdateDto(caseId, 'paid'));
    console.log('Service request update sent to callback URL');
    await waitForFinishedBusinessProcess(caseId);
  }
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(`Case ${caseNumber} has been created.`);
  addUserCaseMapping(caseId(), config.applicantSolicitorUser);
}).retry(3);

Scenario('1v1 Claimant solicitor Enter Breathing Space', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.enterBreathingSpace();
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

Scenario('1v1 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({LRspec}) => {
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

Scenario('1v1 Claimant solicitor Lift Breathing Space', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.liftBreathingSpace();
  await LRspec.click('Sign out');
}).retry(3);

Scenario('1v1 Claimant solicitor responds to defence - claimant Intention to proceed', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.respondToDefence({mpScenario: 'ONE_V_ONE', claimType: 'fast'});
  await LRspec.click('Sign out');
}).retry(3);

AfterSuite(async  () => {
  await unAssignAllUsers();
});
