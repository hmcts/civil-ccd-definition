const config = require('../../../config.js');
const claimData = require('../../../fixtures/events/createClaim.js');
const mpScenario = 'ONE_V_ONE';
const judgeUser = config.judgeUserWithRegionId1;
const legalAdvUser = config.tribunalCaseworkerWithRegionId1;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local;

Feature('CCD 1v1 API test @api-sdo');

function legalAdvisorClaim(mpScenario) {
  const data = claimData.createClaim(mpScenario);
  data.midEventData.ClaimValue.claimFee = {
    calculatedAmountInPence: '7000',
    code: 'FEE0204',
    // local test 4
    version: '6'
  };
  data.valid.ClaimValue.claimValue.statementOfValueInPennies = '85000';
  return data;
}

function judgeClaim(mpScenario) {
  const data = claimData.createClaim(mpScenario);
  // locally is calculated with a mock, can comment the following block
  data.midEventData.ClaimValue.claimFee = {
    calculatedAmountInPence: '100000',
    code: 'FEE0209',
    version: '3'
  };
  // end of block to be commented for local run
  data.valid.ClaimValue.claimValue.statementOfValueInPennies = '2000000';
  return data;
}

async function prepareClaim(api, claimData) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimData);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');
}

Scenario('1v1 full defence unspecified - judge draws disposal order', async ({ api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, judgeClaim(mpScenario));
    await api.createSDO(judgeUser);
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws disposal order', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, legalAdvisorClaim(mpScenario));
    await api.createSDO(legalAdvUser);
  }
});

Scenario('1v1 full defence unspecified - judge draws small claims WITH sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, judgeClaim(mpScenario));
    await api.createSDO(judgeUser, 'CREATE_SMALL');
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws small claims WITH sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, legalAdvisorClaim(mpScenario));
    await api.createSDO(legalAdvUser, 'CREATE_SMALL');
  }
});

Scenario('1v1 full defence unspecified - judge draws fast track WITH sum of damages', async ({ api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, judgeClaim(mpScenario));
    await api.createSDO(judgeUser, 'CREATE_FAST');
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws fast track WITH sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, legalAdvisorClaim(mpScenario));
    await api.createSDO(legalAdvUser, 'CREATE_FAST');
  }
});

Scenario('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages', async ({ api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, judgeClaim(mpScenario));
    await api.createSDO(judgeUser, 'CREATE_SMALL_NO_SUM');
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws small claims WITHOUT sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, legalAdvisorClaim(mpScenario));
    await api.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
  }
});

Scenario('1v1 full defence unspecified - judge draws fast track WITHOUT sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, judgeClaim(mpScenario));
    await api.createSDO(judgeUser, 'CREATE_FAST_NO_SUM');
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws fast track WITHOUT sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, legalAdvisorClaim(mpScenario));
    await api.createSDO(legalAdvUser, 'CREATE_FAST_NO_SUM');
  }
});

Scenario('1v1 full defence unspecified - judge declares SDO unsuitable', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, judgeClaim(mpScenario));
    await api.createSDO(judgeUser, 'UNSUITABLE_FOR_SDO');
  }
});

// skip while ccd-data-store says legalAdvUser has no permission to run this event
Scenario.skip('1v1 full defence unspecified - legal advisor declares SDO unsuitable', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, legalAdvisorClaim(mpScenario));
    await api.createSDO(legalAdvUser, 'UNSUITABLE_FOR_SDO');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
