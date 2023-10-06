const config = require('../../../config.js');

const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
const caseWorkerUser = config.hearingCenterAdminWithRegionId1;
// to use on local because the idam images are different
// const caseWorkerUser = config.judgeUserWithRegionId1Local;
// const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local;
const claimAmountJudge = '11000';

Feature('Record Judgment 1v2 API test unspec @api-unspec @api-tests-1v2SS @api-jo @api-nonprod');

Scenario('1v2 full defence unspecified - caseworker records judgment with set aside (Det.of means - pay instalments)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    console.log('--createClaimWithRepresentedRespondent--');
    await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountJudge);
    console.log('--amendClaimDocuments--');
    await api.amendClaimDocuments(config.applicantSolicitorUser);
    console.log('--notifyClaim--');
    await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
    console.log('--notifyClaimDetails--');
    await api.notifyClaimDetails(config.applicantSolicitorUser);
    console.log('--defendantResponse--');
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
    console.log('--defendantResponse two--');
    await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
    console.log('--claimantResponse--');
    await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
    console.log('--createFinalOrderJO--');
    await api.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
    console.log('--recordJudgment--');
    await api.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
    console.log('--setAsideJudgment--');
    await api.setAsideJudgment(caseWorkerUser);
  }
});

Scenario('1v2 full defence unspecified - caseworker records judgment with mark judgment paid (Det.of means - pay instalments)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    console.log('--createClaimWithRepresentedRespondent--');
    await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountJudge);
    console.log('--amendClaimDocuments--');
    await api.amendClaimDocuments(config.applicantSolicitorUser);
    console.log('--notifyClaim--');
    await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
    console.log('--notifyClaimDetails--');
    await api.notifyClaimDetails(config.applicantSolicitorUser);
    console.log('--defendantResponse--');
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
    console.log('--defendantResponse two--');
    await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
    console.log('--claimantResponse--');
    await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
    console.log('--createFinalOrderJO--');
    await api.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
    console.log('--recordJudgment--');
    await api.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
    console.log('--markJudgmentPaid--');
    await api.markJudgmentPaid(caseWorkerUser);
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
