
const {
  applicantSolicitorUser,
  defendantSolicitorUser,
  secondDefendantSolicitorUser,
  otherSolicitorUser1, otherSolicitorUser2
} = require('../../../config');
const config = require('../../../config.js');
const {RESPONDENT_SOLICITOR_1_QUERY, RESPONDENT_SOLICITOR_2_QUERY} = require('../../../fixtures/queryTypes');
const {waitForFinishedBusinessProcess, checkLRQueryManagementEnabled} = require('../../../api/testingSupport');
let isQueryManagementEnabled = false;

Feature('Unspecified Notice of Change on Unpecified Claim API test @api-noc @api-noc-unspec @api-prod @api-nightly-prod');

Before(async () => {
  isQueryManagementEnabled = await checkLRQueryManagementEnabled();
});

Scenario('notice of change - 1v1 - represented defendant', async ({api, noc}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser);
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForApplicant1Solicitor(caseId, secondDefendantSolicitorUser);
  await api.checkUserCaseAccess(applicantSolicitorUser, false);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, otherSolicitorUser1);
  await api.checkUserCaseAccess(defendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);
}).tag('@api-nonprod').tag('@QM');

Scenario('notice of change - 1v1 - unrepresented defendant', async ({api, noc}) => {
  await api.createClaimWithRespondentLitigantInPerson(applicantSolicitorUser, 'ONE_V_ONE');

  let caseId = await api.getCaseId();

  await api.notifyClaimLip(config.applicantSolicitorUser, 'ONE_V_ONE');
  await api.notifyClaimDetailsLip(config.applicantSolicitorUser, 'ONE_V_ONE');

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, otherSolicitorUser2);

  await api.checkUserCaseAccess(otherSolicitorUser2, true);
});

Scenario('notice of change - 1v2 - both defendants represented - diff solicitor to diff solicitor', async ({api, noc}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, secondDefendantSolicitorUser);
  await api.checkUserCaseAccess(defendantSolicitorUser, false);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForRespondent2Solicitor(caseId, otherSolicitorUser2);
  await api.checkUserCaseAccess(otherSolicitorUser2, true);
});

Scenario('notice of change - 1v2 - both respondents LiPs to same solicitor', async ({api, noc}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');
  await api.notifyClaimLip(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');
  await api.notifyClaimDetailsLip(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, defendantSolicitorUser);
  await noc.requestNoticeOfChangeForRespondent2Solicitor(caseId, defendantSolicitorUser);

  await api.checkUserCaseAccess(defendantSolicitorUser, true);

  await api.defendantResponse(config.defendantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP');
  await api.claimantResponse(config.applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP', 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');
});

Scenario('notice of change - 1v2 - both respondents LiPs to diff solicitor', async ({api, noc}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');
  await api.notifyClaimLip(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');
  await api.notifyClaimDetailsLip(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, defendantSolicitorUser);
  await noc.requestNoticeOfChangeForRespondent2Solicitor(caseId, secondDefendantSolicitorUser);

  await api.checkUserCaseAccess(defendantSolicitorUser, true);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await api.defendantResponse(config.defendantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP', 'solicitorOne');
  await api.defendantResponse(config.secondDefendantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP', 'solicitorTwo');
  await api.claimantResponse(config.applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP', 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');
});

Scenario('notice of change - 1v2 - unrepresented respondent 2', async ({api, noc}) => {
  await api.createClaimWithRespondentLitigantInPerson(applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP_ONE_LIP');
  await api.notifyClaimLip(config.applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP_ONE_LIP');
  await api.notifyClaimDetailsLip(config.applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP_ONE_LIP');

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForRespondent2Solicitor(caseId, secondDefendantSolicitorUser);

  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);
});

Scenario('notice of change - 1v2 - same solicitor to diff solicitor', async ({api, noc, qmSteps}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, secondDefendantSolicitorUser);
  await api.checkUserCaseAccess(defendantSolicitorUser, true);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForRespondent2Solicitor(caseId, otherSolicitorUser1);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);
  await api.checkUserCaseAccess(defendantSolicitorUser, false);

  if (isQueryManagementEnabled) {
    const defendantSolicitor1Query = await qmSteps.raiseQuery(caseId, config.secondDefendantSolicitorUser, RESPONDENT_SOLICITOR_1_QUERY);
    await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, defendantSolicitor1Query, RESPONDENT_SOLICITOR_1_QUERY);
    await qmSteps.followUpOnQuery(caseId, config.secondDefendantSolicitorUser, defendantSolicitor1Query, RESPONDENT_SOLICITOR_1_QUERY);

    const defendantSolicitor2Query = await qmSteps.raiseQuery(caseId, config.otherSolicitorUser1, RESPONDENT_SOLICITOR_2_QUERY);
    await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, defendantSolicitor2Query, RESPONDENT_SOLICITOR_2_QUERY);
    await qmSteps.followUpOnQuery(caseId, config.otherSolicitorUser1, defendantSolicitor2Query, RESPONDENT_SOLICITOR_2_QUERY);
  }
});

Scenario('notice of change - 2v1', async ({api, noc}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'TWO_V_ONE');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForApplicant1Solicitor(caseId, secondDefendantSolicitorUser);
  await api.checkUserCaseAccess(applicantSolicitorUser, false);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForApplicant2Solicitor(caseId, otherSolicitorUser1);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);
});

