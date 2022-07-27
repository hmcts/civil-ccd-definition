/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO_ONE_LEGAL_REP';

Feature('CCD 1v1 API test @api-dj-1v2');

Scenario('Default Judgment claim 1v2', async ({I, api_dj}) => {
  await api_dj.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api_dj.addCaseNote(config.adminUser);
  await api_dj.amendClaimDocuments(config.applicantSolicitorUser);
  await api_dj.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api_dj.notifyClaimDetails(config.applicantSolicitorUser);
  await api_dj.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_dj.defaultJudgment(config.applicantSolicitorUser);
});

AfterSuite(async  ({api_dj}) => {
  await api_dj.cleanUp();
});
