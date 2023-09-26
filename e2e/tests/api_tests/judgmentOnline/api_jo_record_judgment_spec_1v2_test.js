/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO';

Feature('Record Judgment 1v2 API test spec @api-spec @api-tests-1v2 @api-jo @api-non-prod-jo');

Scenario('Record Judgment Spec claim 1v2', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
