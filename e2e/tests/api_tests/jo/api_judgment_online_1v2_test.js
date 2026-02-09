const config = require('../../../config.js');

const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
const caseWorkerUser = config.hearingCenterAdminWithRegionId1;
const claimAmountJudge = '11000';

Feature('Record Judgment 1v2 API test unspec').tag('@api-nightly-prod');

Scenario('1v2 full defence unspecified - caseworker records judgment with set aside (Det.of means - pay instalments)', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountJudge);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  await api.createSDO(config.judgeUserWithRegionId1, 'CREATE_FAST_NO_SUM');
  await api.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
  await api.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
  await api.setAsideJudgment(caseWorkerUser);
});

Scenario('1v2 full defence unspecified - caseworker records judgment with mark judgment paid (Det.of means - pay instalments)', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountJudge);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  await api.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
  await api.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
  await api.markJudgmentPaid(caseWorkerUser);
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
