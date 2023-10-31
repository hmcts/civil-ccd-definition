/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO';
const caseWorkerUser = config.hearingCenterAdminWithRegionId1;
// to use on local because the idam images are different
// const caseWorkerUser = config.judgeUserWithRegionId1Local;
// const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local;

Feature('Record Judgment 1v2 API test spec @api-spec-1v2 @api-jo @api-nonprod');

// Scenario('Record Judgment with set aside Spec claim 1v2', async ({I, api_spec}) => {
//   if (['preview', 'demo'].includes(config.runningEnv)) {
//     console.log('--createClaimWithRepresentedRespondent--');
//     await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
//     console.log('--defendantResponse--');
//     await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario);
//     console.log('--claimantResponse--');
//     await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario,
//       'JUDICIAL_REFERRAL');
//     console.log('--createFinalOrderJO--');
//     await api_spec.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
//     console.log('--recordJudgment--');
//     await api_spec.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
//     console.log('--setAsideJudgment--');
//     await api_spec.setAsideJudgment(caseWorkerUser);
//   }
// });
// Scenario('Record Judgment with set aside Spec claim 1v2', async ({I, api_spec}) => {
//   if (['preview', 'demo'].includes(config.runningEnv)) {
//     console.log('--createClaimWithRepresentedRespondent--');
//     await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
//     console.log('--defendantResponse--');
//     await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario);
//     console.log('--claimantResponse--');
//     await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario,
//       'JUDICIAL_REFERRAL');
//     console.log('--sdo--');
//     await api_spec.createSDO(config.judgeUserWithRegionId1, 'CREATE_FAST_NO_SUM');
//     console.log('--createFinalOrderJO--');
//     await api_spec.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
//     console.log('--recordJudgment--');
//     await api_spec.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
//     console.log('--setAsideJudgment--');
//     await api_spec.setAsideJudgment(caseWorkerUser);
//   }
// });

// Scenario('Record Judgment with mark judgment paid Spec claim 1v2', async ({I, api_spec}) => {
//   if (['preview', 'demo'].includes(config.runningEnv)) {
//     console.log('--createClaimWithRepresentedRespondent--');
//     await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
//     console.log('--defendantResponse--');
//     await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario);
//     console.log('--claimantResponse--');
//     await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario,
//       'JUDICIAL_REFERRAL');
//     console.log('--createFinalOrderJO--');
//     await api_spec.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
//     console.log('--recordJudgment--');
//     await api_spec.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
//     console.log('--markJudgmentPaid--');
//     await api_spec.markJudgmentPaid(caseWorkerUser);
//   }
// });

// AfterSuite(async  ({api_spec}) => {
//   await api_spec.cleanUp();
// });
