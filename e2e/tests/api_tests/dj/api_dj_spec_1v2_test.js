
const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO';

Feature('Spec 1v2 api default judgment journey').tag('@civil-service-nightly @api-dj');

// DTSCCI-5198 REDUCE: DEFAULT_JUDGEMENT_SPEC non-divergent 1v2 is service-owned
// (DefaultJudgementSpecWorkflowTest). Spec 1v1 remains the API smoke path.
Scenario.skip('Default Judgment Spec claim 1v2 non divergent', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false );
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, false);
});

// DTSCCI-5198 REDUCE: divergent heritage transition covered in DefaultJudgementSpecWorkflowTest.
Scenario.skip('Default Judgment Spec claim 1v2 divergent', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, true);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
