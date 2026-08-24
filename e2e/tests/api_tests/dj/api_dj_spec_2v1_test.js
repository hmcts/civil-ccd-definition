
const config = require('../../../config.js');
const mpScenario = 'TWO_V_ONE';

Feature('Spec 2v1 api default judgment journey').tag('@civil-service-nightly @api-dj');

// DTSCCI-5198 REDUCE: 2v1 is non-divergent in DefaultJudgementSpecHandler.
// Covered by DefaultJudgementSpecWorkflowTest and spec 1v1 API smoke.
Scenario.skip('Default Judgment Spec claim 2v1', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, false);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
