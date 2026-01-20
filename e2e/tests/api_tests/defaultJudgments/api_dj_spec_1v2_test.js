

const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO';

Feature('Spec 1v2 api default judgment journey').tag('@api-dj @api-nightly-prod');

Scenario('01 Default Judgment Spec claim 1v2 non divergent', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false );
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, false);
});

Scenario('02 Default Judgment Spec claim 1v2 divergent', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, true);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
