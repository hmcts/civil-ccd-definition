/* eslint-disable no-unused-vars */
const {
  applicantSolicitorUser,
  defendantSolicitorUser,
  secondDefendantSolicitorUser,
  otherSolicitorUser1, otherSolicitorUser2
} = require('../../../config');
const config = require('../../../config.js');

Feature('Unspecified Notice of Change on Unpecified Claim API test @api-noc @api-noc-unspec');

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
});

Scenario('notice of change - 1v1 - unrepresented defendant', async ({api, noc}) => {
  await api.createClaimWithRespondentLitigantInPerson(applicantSolicitorUser, 'ONE_V_ONE');

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, defendantSolicitorUser);

  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await api.checkUserCaseAccess(defendantSolicitorUser, true);
});

// todo check orgs exist in preview/demo/aat
Scenario.skip('notice of change - 1v2 - both defendants represented - diff solicitor to diff solicitor', async ({api, noc}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, otherSolicitorUser1);
  await api.checkUserCaseAccess(defendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);

  await noc.requestNoticeOfChangeForRespondent2Solicitor(caseId, otherSolicitorUser2);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser2, true);
});

Scenario('notice of change - 1v2 - both respondents LiPs to same solicitor', async ({api, noc}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, defendantSolicitorUser);
  await noc.requestNoticeOfChangeForRespondent2Solicitor(caseId, defendantSolicitorUser);

  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await api.checkUserCaseAccess(defendantSolicitorUser, true);

  await api.defendantResponse(config.defendantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP');
  await api.claimantResponse(config.applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP', 'AWAITING_APPLICANT_INTENTION');
});

Scenario('notice of change - 1v2 - both respondents LiPs to diff solicitor', async ({api, noc}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, defendantSolicitorUser);
  await noc.requestNoticeOfChangeForRespondent2Solicitor(caseId, secondDefendantSolicitorUser);

  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await api.checkUserCaseAccess(defendantSolicitorUser, true);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await api.defendantResponse(config.defendantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP', 'solicitorOne');
  await api.defendantResponse(config.secondDefendantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP', 'solicitorTwo');
  await api.claimantResponse(config.applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP', 'AWAITING_APPLICANT_INTENTION');
});

Scenario('notice of change - 1v2 - unrepresented respondent 2', async ({api, noc}) => {
  await api.createClaimWithRespondentLitigantInPerson(applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP_ONE_LIP');

  let caseId = await api.getCaseId();

  await noc.requestNoticeOfChangeForRespondent2Solicitor(caseId, secondDefendantSolicitorUser);

  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);
});

Scenario('notice of change - 1v2 - same solicitor to diff solicitor', async ({api, noc}) => {
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

