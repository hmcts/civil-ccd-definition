

const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');
const { PUBLIC_QUERY} = require('../../../fixtures/queryTypes');
const {respondToQueryHearingTask, respondToQueryCTSCTask } = require('../../../fixtures/wa/respondToQueryTasks');
const {adjustCaseSubmittedDateForPublicQueries} = require('../../../helpers/lipQueriesHelper');

const claimType = 'SmallClaims';
let caseId;

Feature('1v1 LIP v LIP and LR v LIP spec api journeys').tag('@api-spec-cui @api-nightly-prod');

Before(async () => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('1v1 LiP v LiP Part admit defendant and claimant response - claimant rejects installment plan - CARM enabled', async ({api_spec_cui}) => {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, true);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'SmallClaimPartAdmit', true);
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'IN_MEDIATION', true, 'partadmit');
});

Scenario('1v1 LiP v LiP defendant and claimant response - CARM enabled - Minti Enabled', async ({api_spec_cui}) => {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, 'INTERMEDIATE', true, '', true);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'INTERMEDIATE', true);
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'AWAITING_APPLICANT_INTENTION', true);
});

Scenario('1v1 LiP v LiP Case Progression Journey', async ({ api_spec_cui, qmSteps }) => {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, 'FastTrack', false);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'FastTrack', false);
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'JUDICIAL_REFERRAL', false);
  await api_spec_cui.createSDO(config.judgeUserWithRegionId1, 'CREATE_FAST');
  await adjustCaseSubmittedDateForPublicQueries(caseId, true);
  let query = await qmSteps.raiseLipQuery(caseId, config.applicantCitizenUser, PUBLIC_QUERY, true);
  await qmSteps.validateQmResponseTask(caseId, config.hearingCenterAdminWithRegionId1, respondToQueryAdminTask(query.id), query.id);
  await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, query, PUBLIC_QUERY);
  await qmSteps.followUpOnLipQuery(caseId, config.applicantCitizenUser, query, PUBLIC_QUERY);
  query = await qmSteps.raiseLipQuery(caseId, config.defendantCitizenUser2, PUBLIC_QUERY, true);
  await qmSteps.validateQmResponseTask(caseId, config.hearingCenterAdminWithRegionId1, respondToQueryAdminTask(query.id), query.id);
  await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, query, PUBLIC_QUERY);
  await qmSteps.followUpOnLipQuery(caseId, config.defendantCitizenUser2, query, PUBLIC_QUERY);
  await api_spec_cui.evidenceUploadApplicant(config.applicantCitizenUser);
  await api_spec_cui.evidenceUploadDefendant(config.defendantCitizenUser2);
  await api_spec_cui.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'FAST_TRACK_TRIAL', 'CUI');
  await api_spec_cui.trialReadinessCitizen(config.applicantCitizenUser);
  await api_spec_cui.trialReadinessCitizen(config.defendantCitizenUser2);
  await api_spec_cui.createFinalOrder(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
});

Scenario('1v1 LiP v LiP Request for reconsideration', async ({api_spec_cui}) => {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, 'Request for reconsideration track', false);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'Request for reconsideration track', false, 'FULL_DEFENCE');
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'JUDICIAL_REFERRAL', false);
  await api_spec_cui.createSDO(config.tribunalCaseworkerWithRegionId4);
  await api_spec_cui.requestForReconsiderationCitizen(config.applicantCitizenUser);
  await api_spec_cui.judgeDecisionOnReconsiderationRequest(config.judgeUserWithRegionId1, 'CREATE_SDO');
});

Scenario('1v1 LiP v LR defendant and claimant response- CARM enabled', async ({noc, api_spec_cui, qmSteps}) => {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, true);
  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, config.defendantSolicitorUser);
  await api_spec_cui.checkUserCaseAccess(config.defendantCitizenUser2, false);
  await api_spec_cui.checkUserCaseAccess(config.defendantSolicitorUser, true);
  // After CIV-14085 case moves to PROCEEDS_IN_HERITAGE_SYSTEM so defendant/claimant responses are not required here
  await adjustCaseSubmittedDateForPublicQueries(caseId, true);
  let query = await qmSteps.raiseLipQuery(caseId, config.applicantCitizenUser, PUBLIC_QUERY, false);
  await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(query.id, true), query.id);
  await qmSteps.respondToQuery(caseId, config.ctscAdminUser, query, PUBLIC_QUERY);
  await qmSteps.followUpOnLipQuery(caseId, config.applicantCitizenUser, query, PUBLIC_QUERY);
  query = await qmSteps.raiseLRQuery(caseId, config.defendantSolicitorUser, PUBLIC_QUERY, false);
  await qmSteps.respondToQuery(caseId, config.ctscAdminUser, query, PUBLIC_QUERY);
  await qmSteps.followUpOnLRQuery(caseId, config.defendantSolicitorUser, query, PUBLIC_QUERY);
}).tag('@api-prod @api-nonprod');

Scenario('1v1 LR v LiP defendant and claimant response - claimant does NoC - CARM enabled @api-nightly-prod', async ({noc, api_spec_cui}) => {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, true);
  await noc.requestNoticeOfChangeForApplicant1Solicitor(caseId, config.applicantSolicitorUser);
  await api_spec_cui.checkUserCaseAccess(config.applicantCitizenUser, false);
  await api_spec_cui.checkUserCaseAccess(config.applicantSolicitorUser, true);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, true);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', 'IN_MEDIATION', true);
});

Scenario('1v1 LR v LiP defendant and claimant response - claim created from exui - CARM enabled @api-nightly-prod', async ({api_spec_cui}) => {
  caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', 'SmallClaims', true);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'SmallClaims', true);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', 'IN_MEDIATION', true);
});

Scenario('1v1 LR v LiP case progression', async ({ api_spec_cui, qmSteps }) => {
  caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', 'FastTrack', false);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'FastTrack', false);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', 'JUDICIAL_REFERRAL', false);
  await api_spec_cui.createSDO(config.judgeUserWithRegionId1, 'CREATE_FAST');
  await adjustCaseSubmittedDateForPublicQueries(caseId, true);
  let query = await qmSteps.raiseLRQuery(caseId, config.applicantSolicitorUser, PUBLIC_QUERY, true);
  await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, query, PUBLIC_QUERY);
  await qmSteps.followUpOnLRQuery(caseId, config.applicantSolicitorUser, query, PUBLIC_QUERY);
  query = await qmSteps.raiseLipQuery(caseId, config.defendantCitizenUser2, PUBLIC_QUERY, true);
  await qmSteps.validateQmResponseTask(caseId, config.hearingCenterAdminWithRegionId1, respondToQueryAdminTask(query.id), query.id);
  await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, query, PUBLIC_QUERY);
  await qmSteps.followUpOnLipQuery(caseId, config.defendantCitizenUser2, query, PUBLIC_QUERY);
  await api_spec_cui.evidenceUploadDefendant(config.defendantCitizenUser2);
  await api_spec_cui.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'FAST_TRACK_TRIAL');
  await api_spec_cui.amendHearingDueDate(config.systemupdate);
  await api_spec_cui.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
  await api_spec_cui.trialReadinessCitizen(config.defendantCitizenUser2);
  await api_spec_cui.createFinalOrder(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
});

Scenario('1v1 LR v LiP Request for reconsideration', async ({ api_spec_cui }) => {
  caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', 'Request for reconsideration track', false);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'Request for reconsideration track', false);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', 'JUDICIAL_REFERRAL', false);
  await api_spec_cui.createSDO(config.tribunalCaseworkerWithRegionId4);
  await api_spec_cui.requestForReconsiderationCitizen(config.defendantCitizenUser2);
  await api_spec_cui.judgeDecisionOnReconsiderationRequest(config.judgeUserWithRegionId1, 'CREATE_SDO');
});

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});
