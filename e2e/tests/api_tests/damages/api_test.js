/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('CCD 1v1 API test @api2-dj');

Scenario('Default Judgment claim', async ({I, api}) => {
  console.log("------- STEP 1");
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  console.log("------- STEP 2");
  await api.addCaseNote(config.adminUser);
  console.log("------- STEP 3");
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  console.log("-------PREVIOUS STEP NOTIFY CLAIM");
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  console.log("------- STEP 5");
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  console.log("------- STEP 6");
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  console.log("------- STEP 7");
  await api.defaultJudgment(config.applicantSolicitorUser);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
