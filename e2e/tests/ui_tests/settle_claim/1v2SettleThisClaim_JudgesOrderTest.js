const config = require('../../../config.js');
const {addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
let caseNumber;

Feature('Settle this Claim - Reason for settlement - judges order - 1v2 - spec').tag('@master-e2e-ft @e2e-settle-discontinue');

Scenario('Prepare 1v2 spec small track claim up to claim issue', async ({api_spec_small, LRspec}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');
  caseNumber = await api_spec_small.getCaseId();
  await LRspec.setCaseId(caseNumber);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
}).retry(2);

Scenario('Reason for settlement - judges order', async ({LRspec}) => {
  await LRspec.login(config.hearingCenterAdminWithRegionId1);
  await LRspec.requestSettleThisClaimJudgesOrderForUI();
}).retry(2);

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
  await unAssignAllUsers();
});
