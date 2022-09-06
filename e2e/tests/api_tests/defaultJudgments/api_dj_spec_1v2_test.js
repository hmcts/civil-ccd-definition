/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO';

Feature('CCD 1v2 API test @api-dj-1v2, @api-dj');

Scenario('Default Judgment Spec claim 1v2', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
