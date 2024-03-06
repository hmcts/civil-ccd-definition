const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE';
const caseWorkerUser = config.hearingCenterAdminWithRegionId1;
const judgeUser = config.judgeUserWithRegionId1;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const caseWorkerUser = config.tribunalCaseworkerWithRegionId1Local;
const claimAmountJudge = '11000';

Feature('Record Judgment 1v1 API test unspec @api-unspec @api-tests-1v1 @api-jo @api-nonprod');

Scenario('1v1 full defence unspecified - caseworker records judgment (Judge Order - pay instalments)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    console.log('createClaimWithRepresentedRespondent');
    await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountJudge);
    console.log('amendClaimDocuments');
    await api.amendClaimDocuments(config.applicantSolicitorUser);
    console.log('notifyClaim');
    await api.notifyClaim(config.applicantSolicitorUser);
    console.log('notifyClaimDetails');
    await api.notifyClaimDetails(config.applicantSolicitorUser);
    console.log('defendantResponse');
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
    console.log('claimantResponse');
    await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
    console.log('sdo');
    await api.createSDO(judgeUser, 'CREATE_FAST_NO_SUM');
    console.log('createFinalOrderJO');
    await api.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');
    console.log('recordJudgment');
    await api.recordJudgment(caseWorkerUser, mpScenario, 'JUDGE_ORDER', 'PAY_IN_INSTALMENTS');
    console.log('setAsideJudgment');
    await api.setAsideJudgment(caseWorkerUser);
  }
});

Scenario('1v1 full defence unspecified - caseworker records judgment with set aside (Judge Order - pay immediately)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    console.log('createClaimWithRepresentedRespondent');
    await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountJudge);
    console.log('amendClaimDocuments');
    await api.amendClaimDocuments(config.applicantSolicitorUser);
    console.log('notifyClaim');
    await api.notifyClaim(config.applicantSolicitorUser);
    console.log('notifyClaimDetails');
    await api.notifyClaimDetails(config.applicantSolicitorUser);
    console.log('defendantResponse');
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
    console.log('claimantResponse');
    await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
    console.log('sdo');
    await api.createSDO(judgeUser, 'CREATE_FAST_NO_SUM');
    console.log('createFinalOrderJO');
    await api.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');
    console.log('recordJudgment');
    await api.recordJudgment(caseWorkerUser, mpScenario, 'JUDGE_ORDER', 'PAY_IMMEDIATELY');
    console.log('setAsideJudgment');
    await api.setAsideJudgment(caseWorkerUser);
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
