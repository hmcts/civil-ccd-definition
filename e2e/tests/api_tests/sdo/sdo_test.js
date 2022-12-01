const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('CCD 1v1 API test @api-sdo');

Scenario('1v1 full defence unspecified - judge draws disposal order', async ({ api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION');
  await api.createSDO(config.judgeUserWithRegionId1Local);
});

// skipped because Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor draws disposal order', async ({api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(null, config.legalAdvisorUser);
// });
//
// Scenario('1v1 full defence unspecified - judge draws small claims WITH sum of damages', async ({api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(null, config.judgeUserWithRegionId1, 'CREATE_SMALL');
// });
//
// // skipped because Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor draws small claims WITH sum of damages', async ({api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(null, config.legalAdvisorUser, 'CREATE_SMALL');
// });
//
// Scenario('1v1 full defence unspecified - judge draws fast track WITH sum of damages', async ({ api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(null, config.judgeUserWithRegionId1, 'CREATE_FAST');
// });
//
// // skipped bc Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor draws fast track WITH sum of damages', async ({api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(null, config.legalAdvisorUser, 'CREATE_FAST');
// });
//
// Scenario('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages', async ({ api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(null, config.judgeUserWithRegionId1, 'CREATE_SMALL_NO_SUM');
// });
//
// // skipped bc Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor draws small claims WITHOUT sum of damages', async ({api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(null, config.legalAdvisorUser, 'CREATE_SMALL_NO_SUM');
// });
//
// Scenario('1v1 full defence unspecified - judge draws fast track WITHOUT sum of damages', async ({api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(null, config.judgeUserWithRegionId1, 'CREATE_FAST_NO_SUM');
// });
//
// // skipped bc Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor draws fast track WITHOUT sum of damages', async ({api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(null, config.legalAdvisorUser, 'CREATE_FAST_NO_SUM');
// });
//
// Scenario('1v1 full defence unspecified - judge declares SDO unsuitable', async ({api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(null, config.judgeUserWithRegionId1, 'UNSUITABLE_FOR_SDO');
// });
//
// // skipped bc Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence unspecified - legal advisor declares SDO unsuitable', async ({api_sdo}) => {
//   await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
//   await api_sdo.createSDO(config.legalAdvisorUser, 'UNSUITABLE_FOR_SDO');
//   await api_sdo.createSDO(config.judgeUserWithRegionId1, 'CREATE_DISPOSAL');
// });
//
// Scenario('1v1 full defence specified - judge draws disposal order', async ({ api_spec, api_sdo}) => {
//   let caseId = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
//   await api_spec.defendantResponse(config.defendantSolicitorUser);
//   await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
//     'AWAITING_APPLICANT_INTENTION');
//
//   await api_sdo.createSDO(caseId, config.judgeUserWithRegionId1);
// });
//
// // skipped bc Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence specified - legal advisor draws disposal order', async ({api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser, '950');
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser, '950');
//   await api_sdo.createSDO(config.legalAdvisorUser);
// });
//
// Scenario('1v1 full defence specified - judge draws small claims WITH sum of damages',
//   async ({api_spec, api_sdo}) => {
//     let caseId = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
//     await api_spec.defendantResponse(config.defendantSolicitorUser);
//     await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
//       'AWAITING_APPLICANT_INTENTION');
//
//     await api_sdo.createSDO(caseId, config.judgeUserWithRegionId1, 'CREATE_SMALL');
//   });
//
// // skip bcLegal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence specified - legal advisor draws small claims WITH sum of damages', async ({api_sdo}) => {
//   await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser, '950');
//   await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
//   await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser, '950');
//   await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_SMALL');
// });
//
// Scenario('1v1 full defence specified - judge draws fast track WITH sum of damages',
//   async ({api_spec, api_sdo}) => {
//     let caseId = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
//     await api_spec.defendantResponse(config.defendantSolicitorUser);
//     await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
//       'AWAITING_APPLICANT_INTENTION');
//
//     await api_sdo.createSDO(caseId, config.judgeUserWithRegionId1, 'CREATE_FAST');
//   });
//
// // skip bc Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence specified - legal advisor draws fast track WITH sum of damages',
//   async ({api_spec, api_sdo}) => {
//     let caseId = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
//     await api_spec.defendantResponse(config.defendantSolicitorUser);
//     await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
//       'AWAITING_APPLICANT_INTENTION');
//
//     await api_sdo.createSDO(caseId, config.legalAdvisorUser, 'CREATE_FAST');
//   });
//
// Scenario('1v1 full defence specified - judge draws small claims WITHOUT sum of damages',
//   async ({api_spec, api_sdo}) => {
//     let caseId = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
//     await api_spec.defendantResponse(config.defendantSolicitorUser);
//     await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
//       'AWAITING_APPLICANT_INTENTION');
//
//     await api_sdo.createSDO(caseId, config.judgeUserWithRegionId1, 'CREATE_SMALL_NO_SUM');
//   });
//
// // skip bc Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence specified - legal advisor draws small claims WITHOUT sum of damages',
//   async ({api_spec, api_sdo}) => {
//     let caseId = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
//     await api_spec.defendantResponse(config.defendantSolicitorUser);
//     await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
//       'AWAITING_APPLICANT_INTENTION');
//
//     await api_sdo.createSDO(caseId, config.legalAdvisorUser, 'CREATE_SMALL_NO_SUM');
//   });
//
// Scenario('1v1 full defence specified - judge draws fast track WITHOUT sum of damages',
//   async ({api_spec, api_sdo}) => {
//     let caseId = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
//     await api_spec.defendantResponse(config.defendantSolicitorUser);
//     await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
//       'AWAITING_APPLICANT_INTENTION');
//
//     await api_sdo.createSDO(caseId, config.judgeUserWithRegionId1, 'CREATE_FAST_NO_SUM');
//   });
//
// // skip Legal advisor user not yet implemented on environment, so legal advisor tests must be uncommented later
// Scenario.skip('1v1 full defence specified - legal advisor draws fast track WITHOUT sum of damages',
//   async ({api_spec, api_sdo}) => {
//     let caseId = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
//     await api_spec.defendantResponse(config.defendantSolicitorUser);
//     await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
//       'AWAITING_APPLICANT_INTENTION');
//
//     await api_sdo.createSDO(caseId, config.legalAdvisorUser, 'CREATE_FAST_NO_SUM');
//   });
//
// // skip until CIV-4106 is merged.
// Scenario.skip('1v1 full defence specified - judge argues that case is not suitable for SDO',
//   async ({api_spec, api_sdo}) => {
//     let caseId = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
//     await api_spec.defendantResponse(config.defendantSolicitorUser);
//     await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
//       'AWAITING_APPLICANT_INTENTION');
//
//     await api_sdo.createSDO(caseId, config.legalAdvisorUser, 'UNSUITABLE_FOR_SDO');
//   });

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
