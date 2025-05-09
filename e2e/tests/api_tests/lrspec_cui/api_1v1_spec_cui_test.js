

const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');
const {APPLICANT_CITIZEN_QUERY, RESPONDENT_CITIZEN_QUERY, RESPONDENT_SOLICITOR_QUERY} = require('../../../fixtures/queryTypes');
const {checkLRQueryManagementEnabled} = require('../../../api/testingSupport.js');
const {respondToQueryAdminTask} = require('../../../fixtures/wa/respondToQueryTasks');

const claimType = 'SmallClaims';
let caseId;
let isQueryManagementEnabled = false;


Feature('CCD 1v1 API test @api-spec-cui @api-nonprod');

Before(async () => {
  isQueryManagementEnabled = await checkLRQueryManagementEnabled();
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

async function prepareClaimLiPvLiP(api_spec_cui, carmEnabled, claimType = 'SmallClaims') {
  let expectedEndState = carmEnabled ? 'IN_MEDIATION' : 'JUDICIAL_REFERRAL';
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, carmEnabled);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled);
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, expectedEndState, carmEnabled);
  return caseId;
}

async function prepareClaimLiPvLiPMintiTrack(api_spec_cui, carmEnabled, claimType = 'INTERMEDIATE') {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, carmEnabled, '', true);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled);
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'AWAITING_APPLICANT_INTENTION', carmEnabled);
}

async function prepareClaimLiPvLiPRequestForReconsideration(api_spec_cui, carmEnabled) {
  let expectedEndState = carmEnabled ? 'IN_MEDIATION' : 'JUDICIAL_REFERRAL';
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, 'Request for reconsideration track', carmEnabled);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'Request for reconsideration track', carmEnabled, 'FULL_DEFENCE');
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, expectedEndState, carmEnabled);
}

Scenario('1v1 LiP v LiP Part admit defendant and claimant response - claimant rejects installment plan - CARM enabled', async ({api_spec_cui}) => {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, true);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'SmallClaimPartAdmit', true);
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'IN_MEDIATION', true, 'partadmit');
}).tag('@api-prod @api-nonprod');

Scenario('1v1 LiP v LiP defendant and claimant response - CARM not enabled', async ({api_spec_cui}) => {
  await prepareClaimLiPvLiP(api_spec_cui, false);
});

Scenario('1v1 LiP v LiP defendant and claimant response - CARM enabled - Minti Enabled', async ({api_spec_cui}) => {
  await prepareClaimLiPvLiPMintiTrack(api_spec_cui, true);
});

Scenario('1v1 LiP v LiP Case Progression Journey', async ({api_spec_cui, qmSteps}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimLiPvLiP(api_spec_cui, false, 'FastTrack');
    await api_spec_cui.createSDO(config.judgeUserWithRegionId1, 'CREATE_FAST');

    if (isQueryManagementEnabled) {
      const claimantQuery = await qmSteps.raiseLipQuery(caseId, config.applicantCitizenUser, APPLICANT_CITIZEN_QUERY);
      await qmSteps.validateQmResponseTask(caseId, config.hearingCenterAdminWithRegionId1, respondToQueryAdminTask(claimantQuery.id), claimantQuery.id);
      await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, claimantQuery, APPLICANT_CITIZEN_QUERY);
      const claimantSolicitorFollowUp = await qmSteps.followUpOnLipQuery(caseId, config.applicantCitizenUser, claimantQuery, APPLICANT_CITIZEN_QUERY);
      await qmSteps.validateQmResponseTask(caseId, config.hearingCenterAdminWithRegionId1, respondToQueryAdminTask(claimantSolicitorFollowUp.id), claimantSolicitorFollowUp.id);

      const defendantQuery = await qmSteps.raiseLipQuery(caseId, config.defendantCitizenUser2, RESPONDENT_CITIZEN_QUERY);
      await qmSteps.validateQmResponseTask(caseId, config.hearingCenterAdminWithRegionId1, respondToQueryAdminTask(defendantQuery.id), defendantQuery.id);
      await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, defendantQuery, RESPONDENT_CITIZEN_QUERY);
      const defendantFollowUp = await qmSteps.followUpOnLipQuery(caseId, config.defendantCitizenUser2, defendantQuery, RESPONDENT_CITIZEN_QUERY);
      await qmSteps.validateQmResponseTask(caseId, config.hearingCenterAdminWithRegionId1, respondToQueryAdminTask(defendantFollowUp.id), defendantFollowUp.id);
    }

    await api_spec_cui.evidenceUploadApplicant(config.applicantCitizenUser);
    await api_spec_cui.evidenceUploadDefendant(config.defendantCitizenUser2);
    await api_spec_cui.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'FAST_TRACK_TRIAL', 'CUI');
    await api_spec_cui.trialReadinessCitizen(config.applicantCitizenUser);
    await api_spec_cui.trialReadinessCitizen(config.defendantCitizenUser2);
    await api_spec_cui.createFinalOrder(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
  }
}).tag('@wa-task @QM');

Scenario('1v1 LiP v LiP Request for reconsideration', async ({api_spec_cui}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimLiPvLiPRequestForReconsideration(api_spec_cui, false);
    await api_spec_cui.createSDO(config.tribunalCaseworkerWithRegionId4);
    await api_spec_cui.requestForReconsiderationCitizen(config.applicantCitizenUser);
    await api_spec_cui.judgeDecisionOnReconsiderationRequest(config.judgeUserWithRegionId1, 'CREATE_SDO');
  }
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

Scenario('1v1 LiP v LR defendant and claimant response- CARM not enabled @api-nightly-prod', async ({noc, api_spec_cui}) => {
  await  prepareClaimLiPvLR(api_spec_cui, noc, false);
});

Scenario('1v1 LiP v LR defendant and claimant response- CARM enabled @api-nightly-prod', async ({noc, api_spec_cui, qmSteps}) => {
  await  prepareClaimLiPvLR(api_spec_cui, noc, true);

  if (isQueryManagementEnabled) {
    const claimantQuery = await qmSteps.raiseLipQuery(caseId, config.applicantCitizenUser, APPLICANT_CITIZEN_QUERY);
    await qmSteps.respondToQuery(caseId, config.ctscAdminUser, claimantQuery, APPLICANT_CITIZEN_QUERY);
    await qmSteps.followUpOnLipQuery(caseId, config.applicantCitizenUser, claimantQuery, APPLICANT_CITIZEN_QUERY);

    const defendantSolicitorQuery = await qmSteps.raiseQuery(caseId, config.defendantSolicitorUser, RESPONDENT_SOLICITOR_QUERY, false);
    await qmSteps.respondToQuery(caseId, config.ctscAdminUser, defendantSolicitorQuery, RESPONDENT_SOLICITOR_QUERY);
    await qmSteps.followUpOnQuery(caseId, config.defendantSolicitorUser, defendantSolicitorQuery, RESPONDENT_SOLICITOR_QUERY);
  }
}).tag('@QM');

async function prepareClaimLRvLiP(api_spec_cui, noc, carmEnabled) {
  let expectedEndState = carmEnabled ? 'IN_MEDIATION' : 'JUDICIAL_REFERRAL';
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, carmEnabled);
  await noc.requestNoticeOfChangeForApplicant1Solicitor(caseId, config.applicantSolicitorUser);
  await api_spec_cui.checkUserCaseAccess(config.applicantCitizenUser, false);
  await api_spec_cui.checkUserCaseAccess(config.applicantSolicitorUser, true);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', expectedEndState, carmEnabled);
}

Scenario('1v1 LR v LiP defendant and claimant response - claimant does NoC - CARM not enabled @api-nightly-prod', async ({noc, api_spec_cui}) => {
  await  prepareClaimLRvLiP(api_spec_cui, noc, false);
});

Scenario('1v1 LR v LiP defendant and claimant response - claimant does NoC - CARM enabled @api-nightly-prod', async ({noc, api_spec_cui}) => {
  await  prepareClaimLRvLiP(api_spec_cui, noc, true);
});

async function prepareClaimLRvLiPExui(api_spec_cui, carmEnabled, claimType = 'SmallClaims') {
  let expectedEndState = carmEnabled ? 'IN_MEDIATION' : 'JUDICIAL_REFERRAL';
  caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', claimType, carmEnabled);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', expectedEndState, carmEnabled);
}

Scenario('1v1 LR v LiP defendant and claimant response - claim created from exui - CARM not enabled @api-nightly-prod', async ({api_spec_cui}) => {
  await prepareClaimLRvLiPExui(api_spec_cui, false);
});

Scenario('1v1 LR v LiP defendant and claimant response - claim created from exui - CARM enabled @api-nightly-prod', async ({api_spec_cui}) => {
  await prepareClaimLRvLiPExui(api_spec_cui, true);
});

Scenario('1v1 LR v LiP case progression', async ({api_spec_cui}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimLRvLiPExui(api_spec_cui, false, 'FastTrack');
    await api_spec_cui.createSDO(config.judgeUserWithRegionId1, 'CREATE_FAST');
    await api_spec_cui.evidenceUploadDefendant(config.defendantCitizenUser2);
    await api_spec_cui.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'FAST_TRACK_TRIAL');
    await api_spec_cui.amendHearingDueDate(config.systemupdate);
    await api_spec_cui.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
    await api_spec_cui.trialReadinessCitizen(config.defendantCitizenUser2);
    await api_spec_cui.createFinalOrder(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
  }
});

Scenario('1v1 LR v LiP Request for reconsideration', async ({api_spec_cui}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await  prepareClaimLRvLiPExui(api_spec_cui, false, 'Request for reconsideration track');
    await api_spec_cui.createSDO(config.tribunalCaseworkerWithRegionId4);
    await api_spec_cui.requestForReconsiderationCitizen(config.defendantCitizenUser2);
    await api_spec_cui.judgeDecisionOnReconsiderationRequest(config.judgeUserWithRegionId1, 'CREATE_SDO');
  }
});

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});

