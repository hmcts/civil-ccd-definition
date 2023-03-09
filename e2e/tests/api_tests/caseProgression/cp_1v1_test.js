const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE';
const judgeUser = config.judgeUserWithRegionId1;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local;
const claimAmountJudge = '11000';

Feature('CCD 1v1 API test @api-sdo');

async function prepareClaimSDO(api, claimAmount) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');
  await api.createSDO(judgeUser, 'CREATE_FAST');
}

async function prepareClaimDJ(api) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.addCaseNote(config.adminUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  await api.defaultJudgment(config.applicantSolicitorUser);
  await api.sdoDefaultJudgment(judgeUser);
}

Scenario('1v1 full defence unspecified - judge draws small claims WITH sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSDO(api, claimAmountJudge);

  }
});

Scenario('1v1 full defence unspecified - judge draws fast track WITH sum of damages', async ({ api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimDJ(api, claimAmountJudge);

  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
