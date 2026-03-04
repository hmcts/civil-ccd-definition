const config = require('../../../config.js');
const parties = require('../../../helpers/party');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const {waitForFinishedBusinessProcess} = require('../../../api/testingSupport');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP_OTHER_REMEDY';

let caseNumber;

Feature('1v2 Different Solicitors small claims - Claim Journey Other Remedy').tag('@ui-nightly-prod @ui-other-remedy');

Scenario('01 Claimant solicitor raises a claim against 2 defendants who have different solicitors ', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, '3000');
  caseNumber = await api.getCaseId();
  await I.setCaseId(caseNumber);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
}).retry(2);

Scenario('02 1v2 Diff   - Assign roles to defendants', async () => {
  await assignCaseRoleToUser(caseNumber, 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  await assignCaseRoleToUser(caseNumber,  'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
}).retry(2);

Scenario('04 Defendant 1 solicitor rejects claim for defendant 1', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaim({
    defendant1Response: 'fullDefence',
    claimValue: 3000});
}).retry(2);

Scenario('05 Defendant 2 solicitor rejects claim for defendant 2', async ({I}) => {
  await I.login(config.secondDefendantSolicitorUser);
  await I.respondToClaim({
    party: parties.RESPONDENT_SOLICITOR_2,
    defendant2Response: 'fullDefence',
    claimValue: 3000});
}).retry(2);

Scenario('06 Claimant solicitor responds to defence', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.respondToDefence('ONE_V_TWO_TWO_LEGAL_REP', 3000);
  await waitForFinishedBusinessProcess(caseNumber);
}).retry(2);

AfterSuite(async  () => {
  await unAssignAllUsers();
});
