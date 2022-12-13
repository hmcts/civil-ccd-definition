const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';
// const judgeUser = config.judgeUserWithRegionId1Local;
// const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local;
const judgeUser = config.judgeUserWithRegionId1;
const legalAdvUser = config.tribunalCaseworkerWithRegionId1;

Feature('CCD 1v1 API test @api-sdo');

async function prepareClaim(api) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION');
}

Scenario('1v1 full defence unspecified - judge draws disposal order', async ({ api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(judgeUser);
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws disposal order', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(legalAdvUser);
  }
});

Scenario('1v1 full defence unspecified - judge draws small claims WITH sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(judgeUser, 'CREATE_SMALL');
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws small claims WITH sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(legalAdvUser, 'CREATE_SMALL');
  }
});

Scenario('1v1 full defence unspecified - judge draws fast track WITH sum of damages', async ({ api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(judgeUser, 'CREATE_FAST');
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws fast track WITH sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(legalAdvUser, 'CREATE_FAST');
  }
});

Scenario('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages', async ({ api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(judgeUser, 'CREATE_SMALL_NO_SUM');
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws small claims WITHOUT sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
  }
});

Scenario('1v1 full defence unspecified - judge draws fast track WITHOUT sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(judgeUser, 'CREATE_FAST_NO_SUM');
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws fast track WITHOUT sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(legalAdvUser, 'CREATE_FAST_NO_SUM');
  }
});

Scenario('1v1 full defence unspecified - judge declares SDO unsuitable', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(judgeUser, 'UNSUITABLE_FOR_SDO');
  }
});

Scenario('1v1 full defence unspecified - legal advisor declares SDO unsuitable', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if ('preview' === config.runningEnv) {
    await prepareClaim(api);
    await api.createSDO(legalAdvUser, 'UNSUITABLE_FOR_SDO');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
