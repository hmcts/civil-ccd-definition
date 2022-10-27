const config = require('../../../config.js');

Feature('CCD 1v1 API test @api-sdo');

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - judge draws disposal order', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser);
});

// //TODO: Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence unspecified - legal advisor draws disposal order', async ({I, api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.legalAdvisorUser);
// });
//
// //TODO: Uncomment tests once authorisation is shown to be working.
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence unspecified - judge draws small claims WITH sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.judgeUser, 'CREATE_SMALL');
// });
//
// //TODO: Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence unspecified - legal advisor draws small claims WITH sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_SMALL');
// });
//
// //TODO: Uncomment tests once authorisation is shown to be working.
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence unspecified - judge draws fast track WITH sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.judgeUser, 'CREATE_FAST');
// });
//
// //TODO: Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence unspecified - legal advisor draws fast track WITH sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_FAST');
// });
//
// //TODO: Uncomment tests once authorisation is shown to be working.
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.judgeUser, 'CREATE_SMALL_NO_SUM');
// });
//
// //TODO: Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence unspecified - legal advisor draws small claims WITHOUT sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_SMALL_NO_SUM');
// });
//
// //TODO: Uncomment tests once authorisation is shown to be working.
// // eslint-disable-next-line no-unused-vars
// Scenario('1v1 full defence unspecified - judge draws fast track WITHOUT sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.judgeUser, 'CREATE_FAST_NO_SUM');
// });
//
// //TODO: Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence unspecified - legal advisor draws fast track WITHOUT sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_FAST_NO_SUM');
// });
//
// //TODO: Uncomment tests once CIV-4106 is merged.
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence unspecified - judge declares SDO unsuitable', async ({I, api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.judgeUser, 'UNSUITABLE_FOR_SDO');
// });
//
// //TODO: Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence unspecified - legal advisor declares SDO unsuitable', async ({I, api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.legalAdvisorUser, 'UNSUITABLE_FOR_SDO');
//   await api_sdo.createSDO(config.judgeUser, 'CREATE_DISPOSAL');
// });
//
// //TODO: Uncomment tests once authorisation is shown to be working.
// // eslint-disable-next-line no-unused-vars
// Scenario('1v1 full defence specified - judge draws disposal order', async ({I, api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
//   await api_sdo.createSDO(config.judgeUser);
// });
//
// //TODO: Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence specified - legal advisor draws disposal order', async ({I, api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser, '950');
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser, '950');
//   await api_sdo.createSDO(config.legalAdvisorUser);
// });
//
// //TODO: Uncomment tests once authorisation is shown to be working.
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence specified - judge draws small claims WITH sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
//   await api_sdo.createSDO(config.judgeUser, 'CREATE_SMALL');
// });
//
// //TODO: Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence specified - legal advisor draws small claims WITH sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser, '950');
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser, '950');
//   await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_SMALL');
// });
//
// //TODO: Uncomment tests once authorisation is shown to be working.
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence specified - judge draws fast track WITH sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
//   await api_sdo.createSDO(config.judgeUser, 'CREATE_FAST');
// });
//
// //TODO: Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence specified - legal advisor draws fast track WITH sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
//   await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_FAST');
// });
//
// //TODO: Uncomment tests once authorisation is shown to be working.
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence specified - judge draws small claims WITHOUT sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
//   await api_sdo.createSDO(config.judgeUser, 'CREATE_SMALL_NO_SUM');
// });
//
// //TODO: Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence specified - legal advisor draws small claims WITHOUT sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser, '950');
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser, '950');
//   await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_SMALL_NO_SUM');
// });
//
// //TODO: Uncomment tests once authorisation is shown to be working.
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence specified - judge draws fast track WITHOUT sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
//   await api_sdo.createSDO(config.judgeUser, 'CREATE_FAST_NO_SUM');
// });
//
// //TODO: Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence specified - legal advisor draws fast track WITHOUT sum of damages', async ({I, api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser, 950);
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser, 950);
//   await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_FAST_NO_SUM');
// });
//
// //TODO: Uncomment tests once CIV-4106 is merged.
// // eslint-disable-next-line no-unused-vars
// Scenario.skip('1v1 full defence specified - judge argues that case is not suitable for SDO', async ({I, api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
//   await api_sdo.createSDO(config.legalAdvisorUser, 'UNSUITABLE_FOR_SDO');
// });

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
