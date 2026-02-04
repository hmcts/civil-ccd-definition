const config = require('../../../config.js');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const {waitForFinishedBusinessProcess} = require('../../../api/testingSupport');

let caseNumber;

Feature('Claim creation 1v2 Diff Solicitor with fast claims').tag('@ui-prod @ui-stay-case');

Scenario('01 Prepare case to awaiting applicant intention', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE1', 'ONE_V_ONE_DIF_SOL',
    'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  await api_spec.defendantResponse(config.secondDefendantSolicitorUser, 'FULL_DEFENCE2', 'ONE_V_ONE_DIF_SOL',
    'AWAITING_APPLICANT_INTENTION');
}).retry(1);

Scenario('02 Claimant responds to claim', async ({LRspec}) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    defendant1Response: 'fullDefence',
    claimType: 'small',
    defenceType: 'dispute'
  });
}).retry(2);

Scenario('03 Stay the case', async ({LRspec}) => {
  await LRspec.stayCase();
  await waitForFinishedBusinessProcess(caseNumber);
}).retry(2);

Scenario('04 Request update on the stay case - Manage stay', async ({LRspec}) => {
  await LRspec.manageStay('REQ_UPDATE');
  await waitForFinishedBusinessProcess(caseNumber);
}).retry(2);

Scenario('05 Lift the stay case - Manage stay', async ({LRspec}) => {
  await LRspec.manageStay('LIFT_STAY', 'HEARING_READINESS');
  await waitForFinishedBusinessProcess(caseNumber);
}).retry(2);

AfterSuite(async  () => {
  await unAssignAllUsers();
});