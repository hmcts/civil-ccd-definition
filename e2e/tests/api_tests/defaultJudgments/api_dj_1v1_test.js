/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('CCD 1v1 API test @api-dj-1v1, @api-dj');

Scenario('Default Judgment claim', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.addCaseNote(config.adminUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  await api.defaultJudgment(config.applicantSolicitorUser);
});

Scenario('Default Judgment claim SDO', async ({I, api}) => {
  await api.sdoDefaultJudgment(config.judgeUserWithRegionId1);
});

AfterSuite(async  ({api}) => {
  //await api.cleanUp();
});
