/* eslint-disable no-unused-vars */
const {
  applicantSolicitorUser,
  defendantSolicitorUser,
  secondDefendantSolicitorUser,
  otherSolicitorUser1, otherSolicitorUser2
} = require('../../../config');

Feature('Unspecified Notice of Change unspec API test @api-noc @api-noc-unspec');

Scenario('notice of change - 1v1 - represented defendant', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser);
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await api.requestNoticeOfChangeForApplicant1Solicitor(secondDefendantSolicitorUser);
  await api.checkUserCaseAccess(applicantSolicitorUser, false);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await api.requestNoticeOfChangeForRespondent1Solicitor(otherSolicitorUser1);
  await api.checkUserCaseAccess(defendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);
});

Scenario('notice of change - 1v1 - unrepresented defendant', async ({api}) => {
  await api.createClaimWithRespondentLitigantInPerson(applicantSolicitorUser);
  await api.requestNoticeOfChangeForRespondent1Solicitor(secondDefendantSolicitorUser);
});

Scenario('notice of change - 1v2 - both defendants represented', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await api.requestNoticeOfChangeForRespondent1Solicitor(otherSolicitorUser1);
  await api.checkUserCaseAccess(defendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);

  await api.requestNoticeOfChangeForRespondent2Solicitor(otherSolicitorUser2);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser2, true);
});

Scenario('notice of change - 1v2 - unrepresented respondent 1', async ({api}) => {
  await api.create1v2ClaimWithUnrepresentedRespondent1(applicantSolicitorUser);
  await api.requestNoticeOfChangeForRespondent1Solicitor(defendantSolicitorUser);
});

// ToDo: Remove skip when master is merged into civil service branch
// Journey is broken and is fixed in master civil service branch
Scenario.skip('notice of change - 1v2 - unrepresented respondent 2', async ({api}) => {
  await api.create1v2ClaimWithUnrepresentedRespondent2(applicantSolicitorUser);
  await api.requestNoticeOfChangeForRespondent2Solicitor(secondDefendantSolicitorUser);
});

Scenario('notice of change - 1v2 - same solicitor', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await api.requestNoticeOfChangeForRespondent1Solicitor(secondDefendantSolicitorUser);
  await api.checkUserCaseAccess(defendantSolicitorUser, true);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await api.requestNoticeOfChangeForRespondent2Solicitor(otherSolicitorUser1);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);
  await api.checkUserCaseAccess(defendantSolicitorUser, false);
});

Scenario('notice of change - 2v1', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'TWO_V_ONE');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await api.requestNoticeOfChangeForApplicant1Solicitor(secondDefendantSolicitorUser);
  await api.checkUserCaseAccess(applicantSolicitorUser, false);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await api.requestNoticeOfChangeForApplicant2Solicitor(otherSolicitorUser1);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);
});

