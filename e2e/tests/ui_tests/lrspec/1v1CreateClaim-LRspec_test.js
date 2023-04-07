const config = require('../../../config.js');
const {assignCaseToLRSpecDefendant, checkToggleEnabled} = require('../../../api/testingSupport');
const {addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const {payClaimFee} = require('../../../api/pbav3CompatibilityHelper');
const {PARTY_FLAGS} = require('../../../fixtures/caseFlags');
// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

let caseNumber;

Feature('Claim creation 1v1 @e2e-tests-spec @e2e-nightly-prod');

Scenario('1v1 Applicant solicitor creates specified claim for fast track @create-claim-spec', async ({LRspec}) => {
  console.log('1v1 Applicant solicitor creates specified claim for fast track @create-claim-spec');
  console.log('Logging in as', config.applicantSolicitorUser.email);
  await LRspec.login(config.applicantSolicitorUser);
  console.log('Logged in as', config.applicantSolicitorUser.email);
  await LRspec.createCaseSpecified('1v1 fast claim', 'organisation', null, 'company', null, 19000);
  caseNumber = await LRspec.grabCaseNumber();
  console.log('Case created. Case number: ', caseNumber);
  payClaimFee(caseId());

  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(`Case ${caseNumber} has been created.`);
  addUserCaseMapping(caseId(), config.applicantSolicitorUser);
}).retry(3);

Scenario('1v1 Claimant solicitor Enter Breathing Space', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.enterBreathingSpace();
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

Scenario('1v1 Claimant solicitor responds to defence - claimant Intention to proceed', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.respondToDefence({mpScenario: 'ONE_V_ONE', claimType: 'fast'});
  await LRspec.click('Sign out');
}).retry(3);

Scenario('Add case flags', async ({LRspec}) => {
  const caseFlags = [{
    partyName: 'Example applicant1 company', roleOnCase: 'Applicant 1',
    details: [PARTY_FLAGS.vulnerableUser.value]
  },{
    partyName: 'John Smith', roleOnCase: 'Applicant solicitor expert',
    details: [PARTY_FLAGS.unacceptableBehaviour.value]
  }
  ];

  await LRspec.login(config.hearingCenterAdminWithRegionId1);
  await LRspec.createCaseFlags(caseFlags);
  await LRspec.validateCaseFlags(caseFlags);
});

AfterSuite(async  () => {
  await unAssignAllUsers();
});
