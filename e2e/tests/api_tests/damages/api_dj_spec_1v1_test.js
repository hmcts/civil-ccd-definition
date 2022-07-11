/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('CCD 1v2 API test @api-dj-spec-1v1');

Scenario('Default Judgment Spec claim 1v1', async ({I, api_dj_spec}) => {
  await api_dj_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api_dj_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_dj_spec.defaultJudgmentSpec(config.applicantSolicitorUser);
});

AfterSuite(async  ({api_dj_spec}) => {
  await api_dj_spec.cleanUp();
});
