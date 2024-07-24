/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');

const claimType = 'SmallClaims';
let caseId;

Feature('CCD 1v1 API test @api-spec-cui @api-nonprod @api-settle-discont');

Before(async () => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

async function prepareClaimLRvLiPExui(api_spec_cui, carmEnabled) {
  let expectedEndState = carmEnabled ? 'IN_MEDIATION' : 'JUDICIAL_REFERRAL';
  caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', claimType, carmEnabled);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', expectedEndState, carmEnabled);
}
Scenario.only('Discontinue claim 1v1 LR v LiP defendant and claimant response - claim created from exui - CARM not enabled', async ({api_spec_cui}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    let mpScenario = 'ONE_V_ONE_NO_P_NEEDED';
    await prepareClaimLRvLiPExui(api_spec_cui, false);
    await api_spec_cui.discontinueClaim(config.applicantSolicitorUser, mpScenario);
  }
});

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});

