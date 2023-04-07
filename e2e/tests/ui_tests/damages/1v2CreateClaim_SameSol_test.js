const config = require('../../../config.js');
const parties = require('../../../helpers/party');
const {waitForFinishedBusinessProcess, checkToggleEnabled} = require('../../../api/testingSupport');
const {addUserCaseMapping, assignCaseRoleToUser, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const {payClaimFee} = require('../../../api/pbav3CompatibilityHelper');

// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const claimant1 = {
  litigantInPerson: false
};
const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};
const respondent2 = {
  represented: true,
  sameLegalRepresentativeAsRespondent1: true
};

let caseNumber;

Feature('1v2 Same Solicitor Claim Journey @e2e-unspec @e2e-multiparty @e2e-1v2SS @e2e-nightly-prod');

Scenario('Claimant solicitor raises a claim against 2 defendants who have the same solicitor', async ({I}) => {
  console.log('Logging in as', config.applicantSolicitorUser.email);
  await I.login(config.applicantSolicitorUser);
  console.log('Logged in as', config.applicantSolicitorUser.email);
  await I.createCase(claimant1, null, respondent1, respondent2);
  caseNumber = await I.grabCaseNumber();
  console.log('Case created. Case number: ', caseNumber);
  payClaimFee(caseId());

  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(`Case ${caseNumber} has been created.`);
  addUserCaseMapping(caseId(), config.applicantSolicitorUser);
}).retry(3);

Scenario('Claimant solicitor notifies both defendants of claim', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.notifyClaim();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Notify claim'));
  await assignCaseRoleToUser(caseId(), 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  await assignCaseRoleToUser(caseId(), 'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
}).retry(3);

Scenario('Claimant solicitor notifies defendant solicitor of claim details', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.notifyClaimDetails();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Notify claim details'));
  await I.click('Sign out');
}).retry(3);

Scenario('Defendant solicitor acknowledges claim', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.acknowledgeClaim('fullDefence', 'fullDefence', null, true);
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Acknowledge claim'));
}).retry(3);

Scenario('Defendant solicitor requests deadline extension', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.navigateToCaseDetails(caseId());
  await I.informAgreedExtensionDate();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Inform agreed extension date'));
}).retry(3);

Scenario('Defendant solicitor adds defendant litigation friend', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.addDefendantLitigationFriend('both');
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Add litigation friend'));
}).retry(3);

Scenario('Defendants solicitor rejects claim for both defendants', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaim({
    party: parties.RESPONDENT_SOLICITOR_1,
    twoDefendants: true,
    sameResponse: true,
    defendant1Response: 'fullDefence'});
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Respond to claim'));
  await I.click('Sign out');
}).retry(3);

Scenario('Claimant solicitor responds to defence', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.respondToDefence('ONE_V_TWO_ONE_LEGAL_REP');
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('View and respond to defence'));
  await waitForFinishedBusinessProcess(caseId());
}).retry(3);

AfterSuite(async  () => {
  await unAssignAllUsers();
});
