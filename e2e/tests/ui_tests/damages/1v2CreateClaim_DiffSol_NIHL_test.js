const config = require('../../../config.js');
//const {paymentUpdate} = require('../../../api/apiRequest');
const parties = require('../../../helpers/party');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
// const {PARTY_FLAGS} = require('../../../fixtures/caseFlags');
const {waitForFinishedBusinessProcess} = require('../../../api/testingSupport');
//const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP_NIHL';

// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;

let caseNumber;

Feature('1v2 Different Solicitors Claim Journey @e2e-unspec @e2e-nightly @e2e-unspec-1v2DS @master-e2e-ft');

Scenario('Claimant solicitor raises a claim against 2 defendants who have different solicitors', async ({I, api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    caseNumber = await api.getCaseId();
    await I.setCaseId(caseNumber);
    addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
    await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
    await api.notifyClaimDetails(config.applicantSolicitorUser);
  }
}).retry(3);

Scenario('1v2 Diff   - Assign roles to defendants', async () => {
  await assignCaseRoleToUser(caseNumber, 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  await assignCaseRoleToUser(caseNumber,  'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
}).retry(3);

Scenario('Defendant 1 solicitor rejects claim for defendant 1', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaim({
    defendant1Response: 'fullDefence',
    claimValue: 20000});
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Respond to claim'));
}).retry(3);

Scenario('Defendant 2 solicitor rejects claim for defendant 2', async ({I}) => {
  await I.login(config.secondDefendantSolicitorUser);
  await I.respondToClaim({
    party: parties.RESPONDENT_SOLICITOR_2,
    defendant2Response: 'fullDefence',
    claimValue: 20000});
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Respond to claim'));
}).retry(3);

Scenario('Claimant solicitor responds to defence', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.respondToDefence('ONE_V_TWO_TWO_LEGAL_REP', 20000);
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('View and respond to defence'));
  await waitForFinishedBusinessProcess(caseNumber);
}).retry(3);

Scenario('Judge triggers SDO', async ({I}) => {
  await I.login(config.judgeUser2WithRegionId2);
  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseNumber);
  await I.waitForText('Summary');
  await I.initiateSDONIHL(null, null, 'fastTrack', null);
}).retry(3);

AfterSuite(async  () => {
  await unAssignAllUsers();
});
