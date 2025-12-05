const config = require('../../../config.js');
const {addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
let caseNumber;

Feature('Settle this Claim - Reason for settlement - judges order - 2v1 - spec').tag('@e2e-nightly-prod');

Scenario('Prepare 2v1 spec small track claim up to claim issue', async ({api_spec_small, LRspec}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  caseNumber = await api_spec_small.getCaseId();
  await LRspec.setCaseId(caseNumber);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
}).retry(2);

Scenario('Reason for settlement - judges order', async ({LRspec}) => {
  await LRspec.login(config.hearingCenterAdminWithRegionId2);
  await LRspec.requestSettleThisClaimJudgesOrderForUI();
}).retry(2);

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
  await unAssignAllUsers();
});
