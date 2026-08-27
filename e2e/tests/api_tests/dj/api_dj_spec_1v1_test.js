
const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

// DTSCCI-5198: service logic is in DefaultJudgementSpecWorkflowTest.
// Keep one CCD + Camunda smoke path; do not run on civil-service PR/master.
Feature('Spec 1v1 api default judgment smoke')
  .tag('@civil-service-smoke @civil-camunda-master @civil-camunda-pr @civil-service-nightly @api-dj');

Scenario('Default Judgment Spec claim 1v1', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, false);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
