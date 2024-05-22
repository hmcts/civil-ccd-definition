/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';
const judgeUser = config.testEarlyAdopterCourts ? config.judgeUser2WithRegionId2 : config.judgeUserWithRegionId1;
const caseWorkerUser = config.testEarlyAdopterCourts ? config.hearingCenterAdminWithRegionId2 : config.hearingCenterAdminWithRegionId1;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const caseWorkerUser = config.tribunalCaseworkerWithRegionId1Local;

Feature('Record Judgment 1v1 API test spec @api-spec-1v1 @api-jo @api-nonprod');

async function prepareClaimSpecRecordJudgment(api_spec){
  console.log('--createClaimWithRepresentedRespondent--');
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  console.log('--informAgreedExtensionDate--');
  await api_spec.informAgreedExtensionDate(config.applicantSolicitorUser);
  console.log('--defendantResponse--');
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  console.log('--claimantResponse--');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario,
    'AWAITING_APPLICANT_INTENTION');
  console.log('--sdo--');
  await api_spec.createSDO(judgeUser, 'CREATE_FAST_NO_SUM');
  console.log('--createFinalOrderJO--');
  await api_spec.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');
  console.log('--recordJudgment--');
  await api_spec.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IMMEDIATELY');
}

Scenario('Record Judgment Spec claim 1v1 with set aside (Judge Order - pay instalments edit to Pay Immediately)', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpecRecordJudgment(api_spec);
    await api_spec.editJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
    console.log('--setAsideJudgment--');
    await api_spec.setAsideJudgment(caseWorkerUser, 'JUDGMENT_ERROR');
  }
});

Scenario('Record Judgment Spec claim 1v1 with mark paid in full', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpecRecordJudgment(api_spec);
    await api_spec.editJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_BY_DATE');
    console.log('--markJudgmentPaid--');
    await api_spec.markJudgmentPaid(config.applicantSolicitorUser);
  }
});

Scenario('Refer To Judge Spec claim 1v1 Defence Received In Time', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpecRecordJudgment(api_spec);
    console.log('--referToJudgeDefenceReceived--');
    await api_spec.referToJudgeDefenceReceived(caseWorkerUser);
  }
});

async function prepareClaimLRvLiP(api_spec_cui, noc) {
  const expectedEndState = 'AWAITING_APPLICANT_INTENTION';
  const claimType = 'SmallClaims';
  let caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType);
  await noc.requestNoticeOfChangeForApplicant1Solicitor(caseId, config.applicantSolicitorUser);
  await api_spec_cui.checkUserCaseAccess(config.applicantCitizenUser, false);
  await api_spec_cui.checkUserCaseAccess(config.applicantSolicitorUser, true);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, 'FULL_ADMISSION');
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', expectedEndState);
}

Scenario('1v1 LR v LiP defendant and claimant response - Full admission - claimant does NoC', async ({noc, api_spec_cui}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimLRvLiP(api_spec_cui, noc);
  }
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
