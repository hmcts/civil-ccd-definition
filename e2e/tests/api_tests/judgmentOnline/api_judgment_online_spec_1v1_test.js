/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';
const judgeUser = config.testEarlyAdopterCourts ? config.judgeUser2WithRegionId2 : config.judgeUserWithRegionId1;
const caseWorkerUser = config.testEarlyAdopterCourts ? config.hearingCenterAdminWithRegionId2 : config.hearingCenterAdminWithRegionId1;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const caseWorkerUser = config.tribunalCaseworkerWithRegionId1Local;

Feature('Record Judgment 1v1 API test spec @api-spec-1v1 @api-jo @api-nonprod-test');

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

Scenario('SetAside Default Judgment after judgment error - Spec claim 1v1 - Case taken offline', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
    await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, false);
    console.log('--setAsideJudgment--');
    console.log(` user : ${caseWorkerUser.email} : config.testEarlyAdopterCourts : ${config.testEarlyAdopterCourts}`);
    await api_spec.setAsideJudgment(caseWorkerUser, 'JUDGMENT_ERROR','ORDER_AFTER_DEFENCE','PROCEEDS_IN_HERITAGE_SYSTEM');
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

Scenario('SetAside Default Judgment Spec claim 1v1 - Record new judgment after hearing', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
    await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, false);
    await api_spec.setAsideJudgment(caseWorkerUser, 'JUDGE_ORDER','ORDER_AFTER_APPLICATION', 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
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
    await api_spec.editJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
  }
});

// AfterSuite(async  ({api_spec}) => {
//   await api_spec.cleanUp();
// });
