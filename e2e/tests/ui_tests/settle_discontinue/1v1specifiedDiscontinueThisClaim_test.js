const config = require('../../../config.js');
const {addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
let caseNumber;
async function prepareClaimSpec(api_spec_small) {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', true);
  await api_spec_small.claimantResponse(config.applicantSolicitorUser, true);
}

Feature('Discontinue This Claim - Full discontinuance  - 1v1 - spec @master-e2e-ft');

Scenario('1v1 spec Discontinue This Claim - Full discontinuance', async ({api_spec_small, LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec_small);
    await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
    caseNumber = await api_spec_small.getCaseId();
    await LRspec.setCaseId(caseNumber);
    addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
  }
}).retry(3);

Scenario('Discontinue This Claim', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await LRspec.login(config.applicantSolicitorUser);
    await LRspec.requestForDiscontinueThisClaimForUI();
  }
}).retry(3);

Scenario('Validate Discontinuance', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await LRspec.login(config.ctscAdminUser);
    await LRspec.requestForValidateDiscontinuanceForUI();
  }
}).retry(3);

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
  await unAssignAllUsers();
});
