const config = require('../../../config.js');
const legalAdvUser = config.tribunalCaseworkerWithRegionId4;

async function prepareClaimSpec(api_spec_small) {
await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', true);
await api_spec_small.claimantResponse(config.applicantSolicitorUser, true);
}

Feature('Request for reconsideration - 1v1 - spec @api-spec-1v1 @api-nonprod @master-e2e-ft');

Scenario('1v1 spec request for reconsideration for Create a new SDO', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec_small);
    await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
  }
});

Scenario('Request for Reconsideration', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec_small.login(config.applicantSolicitorUser);
    await api_spec_small.requestForReconsiderationForUI();
    }
}).retry(3)

Scenario('Decision on Reconsideration Request', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec_small.login(config.judgeUser2WithRegionId4);
    await api_spec_small.decisionForReconsideration();
  }
}).retry(3)

Scenario('Create SDO after Request for Reconsideration', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
  }
});

Scenario('1v1 spec request for reconsideration to uphold the previous order made', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec_small);
    await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
  }
});

Scenario('Request for Reconsideration to uphold the previous order made', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec_small.login(config.applicantSolicitorUser);
    await api_spec_small.requestForReconsiderationForUI();
  }
}).retry(3)

Scenario('Decision on Reconsideration Request to uphold the previous order made', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec_small.login(config.judgeUser2WithRegionId4);
    await api_spec_small.decisionForReconsiderationYesOption();
  }
}).retry(3)

Scenario('1v1 spec request for reconsideration to previous order needs amending', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec_small);
    await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
  }
});

Scenario('Request for Reconsideration to previous order needs amending', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec_small.login(config.applicantSolicitorUser);
    await api_spec_small.requestForReconsiderationForUI();
  }
}).retry(3)

Scenario('Decision on Reconsideration Request to previous order needs amending', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec_small.login(config.judgeUser2WithRegionId4);
    await api_spec_small.decisionForReconsiderationNoOptionForAmending();
  }
}).retry(3)

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
});
