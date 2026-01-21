

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('Unspec 1v1 api default judgment journey').tag('@api-prod @api-dj @api-nightly-prod');

Scenario('Default Judgment Spec claim 1v1', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, false);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
