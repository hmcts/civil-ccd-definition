const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';
const user = config.judgeUserWithRegionId1Local;
// const user = config.judgeUserWithRegionId1;

Feature('CCD 1v1 API test @api-sdo');

async function prepareClaim(api) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION');
}

Scenario.skip('1v1 full defence unspecified - judge draws disposal order', async ({ api}) => {
  await prepareClaim(api);
  await api.createSDO(user);
});

// skipped because Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor draws disposal order', async ({api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(null, config.legalAdvisorUser);
// });

Scenario.skip('1v1 full defence unspecified - judge draws small claims WITH sum of damages', async ({api}) => {
  await prepareClaim(api);
  await api.createSDO(user, 'CREATE_SMALL');
});

// // skipped because Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor draws small claims WITH sum of damages', async ({api}) => {
//   await prepareClaim(api);
//   await api.createSDO(null, config.legalAdvisorUser, 'CREATE_SMALL');
// });

Scenario.skip('1v1 full defence unspecified - judge draws fast track WITH sum of damages', async ({ api}) => {
  await prepareClaim(api);
  await api.createSDO(user, 'CREATE_FAST');
});

// // skipped bc Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor draws fast track WITH sum of damages', async ({api}) => {
//   await prepareClaim(api);
//   await api.createSDO(null, config.legalAdvisorUser, 'CREATE_FAST');
// });

Scenario.skip('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages', async ({ api}) => {
  await prepareClaim(api);
  await api.createSDO(user, 'CREATE_SMALL_NO_SUM');
});

// // skipped bc Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor draws small claims WITHOUT sum of damages', async ({api}) => {
//   await prepareClaim(api);
//   await api.createSDO(null, config.legalAdvisorUser, 'CREATE_SMALL_NO_SUM');
// });

Scenario.skip('1v1 full defence unspecified - judge draws fast track WITHOUT sum of damages', async ({api}) => {
  await prepareClaim(api);
  await api.createSDO(user, 'CREATE_FAST_NO_SUM');
});

// // skipped bc Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor draws fast track WITHOUT sum of damages', async ({api}) => {
//   await prepareClaim(api);
//   await api.createSDO(null, config.legalAdvisorUser, 'CREATE_FAST_NO_SUM');
// });

Scenario.skip('1v1 full defence unspecified - judge declares SDO unsuitable', async ({api}) => {
  await prepareClaim(api);
  await api.createSDO(user, 'UNSUITABLE_FOR_SDO');
});

// // skipped bc Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor declares SDO unsuitable', async ({api}) => {
//   await prepareClaim(api);
//   await api.createSDO(config.legalAdvisorUser, 'UNSUITABLE_FOR_SDO');
//   await api.createSDO(config.judgeUserWithRegionId1, 'CREATE_DISPOSAL');
// });

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
