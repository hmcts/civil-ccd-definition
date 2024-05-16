/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO';
const judgeUser = config.testEarlyAdopterCourts ? config.judgeUser2WithRegionId2 : config.judgeUserWithRegionId1;
const caseWorkerUser = config.testEarlyAdopterCourts ? config.hearingCenterAdminWithRegionId2 : config.hearingCenterAdminWithRegionId1;
// to use on local because the idam images are different
//  const judgeUser = config.judgeUserWithRegionId1Local;
//  const caseWorkerUser = config.tribunalCaseworkerWithRegionId1Local;

//To reduce time of API test, temporarly stop running these tests. These test will modified to run in nightly build
Feature('Record Judgment 1v2 API test spec @api-spec-1v2 @api-jo @api-nightly-prod');

async function prepareClaimSpecFinalOrderDJ(api_spec){
  console.log('--createClaimWithRepresentedRespondent--');
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  console.log('--defendantResponse--');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario);
  console.log('--claimantResponse--');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario,
    'JUDICIAL_REFERRAL');
  console.log('--sdo--');
  await api_spec.createSDO(judgeUser, 'CREATE_FAST_NO_SUM');
  console.log('--createFinalOrderJO--');
  await api_spec.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');

}
Scenario('Record Judgment with set aside Spec claim 1v2 with NO RTL Order - Set Aside After Order', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpecFinalOrderDJ(api_spec);
    console.log('--recordJudgment--');
    await api_spec.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IMMEDIATELY');
    await api_spec.editJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_BY_DATE');
    console.log('--setAsideJudgment--');
    await api_spec.setAsideJudgment(caseWorkerUser, 'JUDGE_ORDER', 'ORDER_AFTER_APPLICATION');
  }
});

Scenario('Record Judgment with set aside Spec claim 1v2 with NO RTL Order after defence - Set Aside after defence', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpecFinalOrderDJ(api_spec);
    console.log('--recordJudgment--');
    await api_spec.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IMMEDIATELY');
    await api_spec.editJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_BY_DATE');
    console.log('--setAsideJudgment--');
    await api_spec.setAsideJudgment(caseWorkerUser, 'JUDGE_ORDER', 'ORDER_AFTER_DEFENCE');
  }
});

Scenario('Record Judgment with mark judgment paid Spec claim 1v2', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    console.log('--createClaimWithRepresentedRespondent--');
    await prepareClaimSpecFinalOrderDJ(api_spec);
    console.log('--recordJudgment--');
    await api_spec.recordJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
    await api_spec.editJudgment(caseWorkerUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_BY_DATE');
    console.log('--markJudgmentPaid--');
    await api_spec.markJudgmentPaid(caseWorkerUser);
  }
});

Scenario('Default Judgment Spec claim 1v2 non-divergent', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false );
    await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
    await api_spec.defaultJudgmentSpec(config.applicantSolicitorUser, mpScenario, false);
  }
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
