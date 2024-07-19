/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
//const caseWorkerUser = config.hearingCenterAdminWithRegionId2;
// To use on local because the idam images are different:
 const caseWorkerUser = config.tribunalCaseworkerWithRegionId1Local;

const claimType = 'SmallClaims';
let caseId;

Feature('CCD Settle and discontinue claim 2v1 API test @api-spec @api-nonprod @api-settle-discont');
Scenario('Settle claim 2v1 scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
    await api_spec.createCaseFlags(caseWorkerUser);
    await api_spec.manageCaseFlags(caseWorkerUser);
    await api_spec.settleClaimSelectClaimant(config.applicantSolicitorUser, 'YES');
  }
});

Scenario('Discontinue claim 1v2 scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    let mpScenario = 'ONE_V_TWO';
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    await api_spec.discontinueClaim(config.applicantSolicitorUser, mpScenario);
  }
});

Scenario('Discontinue claim 2v1 scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    let mpScenario = 'TWO_V_ONE';
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    await api_spec.discontinueClaim(config.applicantSolicitorUser, mpScenario);
  }
});

Scenario('Discontinue claim 1v1 scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    let mpScenario = 'ONE_V_ONE';
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    await api_spec.discontinueClaim(config.applicantSolicitorUser, mpScenario);
  }
});

Scenario('Validate discontinue claim claimant 1v1 scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    let mpScenario = 'ONE_V_ONE';
    let permission = 'YES';
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    await api_spec.discontinueClaim(config.applicantSolicitorUser, mpScenario);
    await api_spec.validateDiscontinueClaimClaimant(caseWorkerUser, permission);
  }
});

Scenario('Validate discontinue claim claimant 1v2 scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    let mpScenario = 'ONE_V_TWO';
    let permission = 'YES';
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    await api_spec.discontinueClaim(config.applicantSolicitorUser, 'ONE_V_TWO_P_NEEDED');
    await api_spec.validateDiscontinueClaimClaimant(caseWorkerUser, permission);
  }
});

Scenario('Validate discontinue claim claimant 1v2 negative scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    let mpScenario = 'ONE_V_TWO';
    let permission = 'NO';
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    await api_spec.discontinueClaim(config.applicantSolicitorUser, 'ONE_V_TWO_P_NEEDED');
    await api_spec.validateDiscontinueClaimClaimant(caseWorkerUser, permission);
  }
});

Scenario('Discontinue claim 1v1 scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    let mpScenario = 'ONE_V_ONE';
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
    await api_spec.discontinueClaim(config.applicantSolicitorUser, mpScenario);
  }
});

async function prepareClaimLRvLiPExui(api_spec, carmEnabled) {
  let expectedEndState = carmEnabled ? 'IN_MEDIATION' : 'JUDICIAL_REFERRAL';
  caseId = await api_spec.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', claimType, carmEnabled);
  await api_spec.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled);
  await api_spec.claimantResponseLRvLIP(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', expectedEndState, carmEnabled);
}

Scenario.only('Discontinue claim 1v1 LRvLip scenario', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    let mpScenario = 'ONE_V_ONE_NO_P_NEEDED';
    await prepareClaimLRvLiPExui(api_spec, false);
    await api_spec.discontinueClaim(config.applicantSolicitorUser, mpScenario);
  }
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
