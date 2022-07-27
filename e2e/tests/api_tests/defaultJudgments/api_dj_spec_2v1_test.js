/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'TWO_V_ONE';

Feature('CCD 2v1 API test @api-dj-spec-2v1');

Scenario('Default Judgment Spec claim 2v1', async ({I, api_dj_spec}) => {
  await api_dj_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api_dj_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_dj_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario);
});

AfterSuite(async  ({api_dj_spec}) => {
  await api_dj_spec.cleanUp();
});
