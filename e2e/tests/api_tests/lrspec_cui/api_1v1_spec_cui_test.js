/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');

const claimType = 'SmallClaims';
let caseId;

Feature('CCD 1v1 API test @api-spec-cui @api-nonprod');

Before(async () => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

async function prepareClaimLiPvLiP(api_spec_cui, carmEnabled) {
  let expectedEndState = carmEnabled ? 'IN_MEDIATION' : 'JUDICIAL_REFERRAL';
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, carmEnabled);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled);
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, expectedEndState, carmEnabled);
}

Scenario('1v1 LiP v LiP defendant and claimant response - CARM not enabled', async ({api_spec_cui}) => {
  await prepareClaimLiPvLiP(api_spec_cui, false);
});

Scenario('1v1 LiP v LiP defendant and claimant response - CARM enabled', async ({api_spec_cui}) => {
  await prepareClaimLiPvLiP(api_spec_cui, true);
});

async function prepareClaimLiPvLR(api_spec_cui, noc, carmEnabled) {
  let expectedEndState = carmEnabled ? 'IN_MEDIATION' : 'JUDICIAL_REFERRAL';
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, carmEnabled);
  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, config.defendantSolicitorUser);
  await api_spec_cui.checkUserCaseAccess(config.defendantCitizenUser2, false);
  await api_spec_cui.checkUserCaseAccess(config.defendantSolicitorUser, true);

  //After CIV-14085 Case will be in PROCEEDS_IN_HERITAGE_SYSTEM, so no need to perform defendant or claimant response
  //await api_spec_cui.defendantResponse(config.defendantSolicitorUser);
  //await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, expectedEndState, carmEnabled);
}

Scenario('1v1 LiP v LR defendant and claimant response- CARM not enabled', async ({noc, api_spec_cui}) => {
  await  prepareClaimLiPvLR(api_spec_cui, noc, false);
});

Scenario('1v1 LiP v LR defendant and claimant response- CARM enabled', async ({noc, api_spec_cui}) => {
  await  prepareClaimLiPvLR(api_spec_cui, noc, true);
});

async function prepareClaimLRvLiP(api_spec_cui, noc, carmEnabled) {
  let expectedEndState = carmEnabled ? 'IN_MEDIATION' : 'JUDICIAL_REFERRAL';
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, carmEnabled);
  await noc.requestNoticeOfChangeForApplicant1Solicitor(caseId, config.applicantSolicitorUser);
  await api_spec_cui.checkUserCaseAccess(config.applicantCitizenUser, false);
  await api_spec_cui.checkUserCaseAccess(config.applicantSolicitorUser, true);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', expectedEndState, carmEnabled);
}

Scenario('1v1 LR v LiP defendant and claimant response - claimant does NoC - CARM not enabled', async ({noc, api_spec_cui}) => {
  await  prepareClaimLRvLiP(api_spec_cui, noc, false);
});

Scenario('1v1 LR v LiP defendant and claimant response - claimant does NoC - CARM enabled', async ({noc, api_spec_cui}) => {
  await  prepareClaimLRvLiP(api_spec_cui, noc, true);
});

async function prepareClaimLRvLiPExui(api_spec_cui, carmEnabled) {
  let expectedEndState = carmEnabled ? 'IN_MEDIATION' : 'JUDICIAL_REFERRAL';
  caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', claimType, carmEnabled);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', expectedEndState, carmEnabled);
}

Scenario('1v1 LR v LiP defendant and claimant response - claim created from exui - CARM not enabled', async ({api_spec_cui}) => {
  await prepareClaimLRvLiPExui(api_spec_cui, false);
});

Scenario('1v1 LR v LiP defendant and claimant response - claim created from exui - CARM enabled', async ({api_spec_cui}) => {
  await prepareClaimLRvLiPExui(api_spec_cui, true);
});

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});

