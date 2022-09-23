/* eslint-disable no-unused-vars */
const {
  applicantSolicitorUser,
  defendantSolicitorUser,
  secondDefendantSolicitorUser,
  otherSolicitorUser1, otherSolicitorUser2
} = require('../../../config');

Feature('Unspecified Notice of Change on Unpecified Claim API test @api-noc @api-noc-unspec');

Scenario('notice of change - 1v1 - represented defendant', async ({api, noc}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser);
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await noc.requestNoticeOfChangeForApplicant1Solicitor(secondDefendantSolicitorUser);
  await api.checkUserCaseAccess(applicantSolicitorUser, false);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForRespondent1Solicitor(otherSolicitorUser1);
  await api.checkUserCaseAccess(defendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);
});

Scenario('notice of change - 1v1 - lip', async ({api, noc}) => {
  await api.createClaimWithRespondentLitigantInPerson(applicantSolicitorUser);
  await noc.requestNoticeOfChangeForRespondent1Solicitor(api.getCaseId(), secondDefendantSolicitorUser);
});

Scenario('notice of change - 1v2 - both defendants represented', async ({api, noc}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await noc.requestNoticeOfChangeForRespondent1Solicitor(otherSolicitorUser1);
  await api.checkUserCaseAccess(defendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);

  await noc.requestNoticeOfChangeForRespondent2Solicitor(otherSolicitorUser2);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser2, true);
});

Scenario('notice of change - 1v2 - respondent 1 lip', async ({api, noc}) => {
  await api.create1v2ClaimWithUnrepresentedRespondent1(applicantSolicitorUser);
  await noc.requestNoticeOfChangeForRespondent1Solicitor(defendantSolicitorUser);
});

// ToDo: Remove skip when master is merged into civil service branch
// Journey is broken and is fixed in master civil service branch
Scenario.skip('notice of change - 1v2 - respondent 2 lip', async ({api, noc}) => {
  await api.create1v2ClaimWithUnrepresentedRespondent2(applicantSolicitorUser);
  await noc.requestNoticeOfChangeForRespondent2Solicitor(secondDefendantSolicitorUser);
});

Scenario('notice of change - 1v2 - same solicitor', async ({api, noc}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await noc.requestNoticeOfChangeForRespondent1Solicitor(secondDefendantSolicitorUser);
  await api.checkUserCaseAccess(defendantSolicitorUser, true);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForRespondent2Solicitor(otherSolicitorUser1);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);
  await api.checkUserCaseAccess(defendantSolicitorUser, false);
});

Scenario('notice of change - 2v1 - represented', async ({api, noc}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'TWO_V_ONE');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  await noc.requestNoticeOfChangeForApplicant1Solicitor(secondDefendantSolicitorUser);
  await api.checkUserCaseAccess(applicantSolicitorUser, false);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForApplicant2Solicitor(otherSolicitorUser1);
  await api.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api.checkUserCaseAccess(otherSolicitorUser1, true);
});

Scenario('notice of change - 2v1 - lip', async ({api, noc}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'TWO_V_ONE_LIP');
  await noc.requestNoticeOfChangeForApplicant1Solicitor(api.getCaseId(), secondDefendantSolicitorUser);
  await noc.requestNoticeOfChangeForApplicant2Solicitor(api.getCaseId(), otherSolicitorUser1);

});
