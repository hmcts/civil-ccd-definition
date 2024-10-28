const config = require('../../../config.js');
const {addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
let caseNumber;

async function prepareClaimSpec1v2(api_spec_small) {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');
}
Feature('Settle this Claim - Confirm marking as paid in full - 1v2 - spec @master-e2e-ft');

Scenario('1v2 spec Settle this Claim - Confirm marking as paid in full', async ({api_spec_small, LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec1v2(api_spec_small);
    caseNumber = await api_spec_small.getCaseId();
    await LRspec.setCaseId(caseNumber);
    addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
  }
}).retry(3);

Scenario('Confirm marking as paid in full', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await LRspec.login(config.applicantSolicitorUser);
    await LRspec.requestForSettleThisClaimForUI();
    }
}).retry(3);

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
  await unAssignAllUsers();
});

Feature('Settle this Claim - Reason for settlement - judges order - 1v2 - spec @master-e2e-ft');

Scenario.skip('1v2 spec Reason for settlement - judges order', async ({api_spec_small, LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec1v2(api_spec_small);
    caseNumber = await api_spec_small.getCaseId();
    await LRspec.setCaseId(caseNumber);
    addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
  }
}).retry(3);

Scenario.skip('Reason for settlement - judges order', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await LRspec.login(config.hearingCenterAdminWithRegionId2);
    await LRspec.requestSettleThisClaimJudgesOrderForUI();
  }
}).retry(3);

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
  await unAssignAllUsers();
});

Feature('Settle this Claim - Reason for settlement - Consent order - 1v2 - spec @master-e2e-ft');

Scenario.skip('1v2 spec Reason for settlement - Consent order', async ({api_spec_small, LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec1v2(api_spec_small);
    caseNumber = await api_spec_small.getCaseId();
    await LRspec.setCaseId(caseNumber);
    addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
  }
}).retry(3);

Scenario.skip('Reason for settlement - Consent order', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await LRspec.login(config.hearingCenterAdminWithRegionId2);
    await LRspec.requestSettleThisClaimConsentOrderForUI();
  }
}).retry(3);

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
  await unAssignAllUsers();
});
