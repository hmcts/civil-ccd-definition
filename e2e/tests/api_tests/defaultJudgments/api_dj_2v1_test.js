/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'TWO_V_ONE';

Feature('CCD 2v1 API test @api-dj-dam-2v1');

Scenario('Default Judgment claim', async ({I, api_dj}) => {
  await api_dj.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api_dj.addCaseNote(config.adminUser);
  await api_dj.amendClaimDocuments(config.applicantSolicitorUser);
  await api_dj.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api_dj.notifyClaimDetails(config.applicantSolicitorUser);
  await api_dj.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_dj.defaultJudgment(config.applicantSolicitorUser);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
