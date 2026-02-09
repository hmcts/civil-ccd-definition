const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE';
const caseWorkerUser = config.hearingCenterAdminWithRegionId1;
const claimAmountJudge = '11000';

Feature('Record Judgment 1v1 API test unspec').tag('@api-nightly-prod');

Scenario('1v1 full defence unspecified - caseworker records judgment with mark judgment paid (Det.of means - pay instalments)', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountJudge);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  await api.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
  await api.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
  await api.markJudgmentPaid(caseWorkerUser);
});

Scenario('1v1 full defence unspecified - caseworker records judgment with mark judgment paid (Det.of means - pay by date)', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountJudge);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  await api.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
  await api.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_BY_DATE');
  await api.markJudgmentPaid(caseWorkerUser);
});

Scenario('1v1 full defence unspecified - caseworker records judgment (Judge Order - pay instalments)', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountJudge);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  await api.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
  await api.recordJudgment(caseWorkerUser, mpScenario, 'JUDGE_ORDER', 'PAY_IN_INSTALMENTS');
  await api.setAsideJudgment(caseWorkerUser);
});

Scenario('1v1 full defence unspecified - caseworker records judgment with set aside (Judge Order - pay immediately)', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountJudge);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  await api.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
  await api.recordJudgment(caseWorkerUser, mpScenario, 'JUDGE_ORDER', 'PAY_IMMEDIATELY');
  await api.setAsideJudgment(caseWorkerUser);
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
