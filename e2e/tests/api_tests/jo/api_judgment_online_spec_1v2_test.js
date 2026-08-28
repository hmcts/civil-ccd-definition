
const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO';
const judgeUser = config.judgeUserWithRegionId1;
const caseWorkerUserReg1 = config.hearingCenterAdminWithRegionId1;
const caseWorkerUserReg2 = config.hearingCenterAdminWithRegionId2;
// to use on local because the idam images are different
//  const judgeUser = config.judgeUserWithRegionId1Local;
//  const caseWorkerUser = config.tribunalCaseworkerWithRegionId1Local;

Feature('1v2 spec record judgment api test');

// DTSCCI-5198 REDUCE: same SET_ASIDE_JUDGMENT handler as the 1v1 JO smoke path.
Scenario.skip('Default judgment Spec claim 1v2 - Set Aside After Order  - Record new judgment', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL', false );
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, false);
  await api_spec.setAsideJudgment(caseWorkerUserReg2, 'JUDGE_ORDER', 'ORDER_AFTER_APPLICATION','All_FINAL_ORDERS_ISSUED');
});

// DTSCCI-5198 REDUCE: paid in full + set aside after defence are in
// JudgmentPaidInFullWorkflowTest and SetAsideJudgmentWorkflowTest.
Scenario.skip('Default judgment Spec claim 1v2 - Set Aside after defence - Case taken offline', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false );
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, false);
  await api_spec.markJudgmentPaid(caseWorkerUserReg2);
  await api_spec.setAsideJudgment(caseWorkerUserReg2, 'JUDGE_ORDER', 'ORDER_AFTER_DEFENCE', 'All_FINAL_ORDERS_ISSUED');
});

// DTSCCI-5198 Record / edit covered by integration tests.
Scenario.skip('Record Judgment with mark judgment paid Spec claim 1v2', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario,
    'JUDICIAL_REFERRAL');
  await api_spec.createSDO(judgeUser, 'CREATE_FAST_NO_SUM');
  await api_spec.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');
  await api_spec.confirmOrderReview(caseWorkerUserReg1);
  await api_spec.recordJudgment(caseWorkerUserReg1, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
  await api_spec.editJudgment(caseWorkerUserReg1, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_BY_DATE');
}).tag('@api-jo');

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
