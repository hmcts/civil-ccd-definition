/* eslint-disable no-unused-vars */
const {
  applicantSolicitorUser,
  defendantSolicitorUser,
  secondDefendantSolicitorUser,
  otherSolicitorUser1, otherSolicitorUser2
} = require('../../../config');
const config = require('../../../config.js');

Feature('Notice of Change on Specified Claim API test @api-noc @api-noc-spec');


Scenario('notice of change - 1v1 - represented defendant', async ({api_spec, noc}) => {
  await api_spec.createClaimWithRepresentedRespondent(applicantSolicitorUser);

  await noc.requestNoticeOfChangeForApplicant1Solicitor(api_spec.getCaseId(), secondDefendantSolicitorUser);
  await api_spec.checkUserCaseAccess(applicantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForRespondent1Solicitor(api_spec.getCaseId(), otherSolicitorUser1);
  await api_spec.checkUserCaseAccess(defendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser1, true);
});

Scenario('notice of change - 1v1 - lip', async ({api_spec, noc}) => {
  await api_spec.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_ONE_LIP');
  await noc.requestNoticeOfChangeForRespondent1Solicitor(api_spec.getCaseId(), otherSolicitorUser1);
});

Scenario('notice of change - 1v2 - both defendants represented', async ({api_spec, noc}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');

  await noc.requestNoticeOfChangeForRespondent1Solicitor(api_spec.getCaseId(), otherSolicitorUser1);
  await api_spec.checkUserCaseAccess(defendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser1, true);

  await noc.requestNoticeOfChangeForRespondent2Solicitor(api_spec.getCaseId(), otherSolicitorUser2);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser2, true);
});

Scenario('notice of change - 2v1 - respondent 1 lip', async ({api_spec, noc}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_LIP_REP');

  await noc.requestNoticeOfChangeForApplicant2Solicitor(api_spec.getCaseId(), otherSolicitorUser1);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser1, true);
});

Scenario('notice of change - 1v2 - respondent 2 lip', async ({api_spec, noc}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_REP_LIP');

  await noc.requestNoticeOfChangeForRespondent1Solicitor(secondDefendantSolicitorUser);
  await api_spec.checkUserCaseAccess(defendantSolicitorUser, true);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForRespondent2Solicitor(otherSolicitorUser1);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, true);
  await api_spec.checkUserCaseAccess(otherSolicitorUser1, true);
  await api_spec.checkUserCaseAccess(defendantSolicitorUser, false);
});

Scenario('notice of change - 1v2 - same solicitor', async ({api_spec, noc}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');

  await noc.requestNoticeOfChangeForRespondent1Solicitor(api_spec.getCaseId(), otherSolicitorUser1);
  await api_spec.checkUserCaseAccess(defendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser1, true);

  await noc.requestNoticeOfChangeForRespondent2Solicitor(api_spec.getCaseId(), otherSolicitorUser2);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser2, true);
});

Scenario('notice of change - 2v1 - represented', async ({api_spec, noc}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');

  await noc.requestNoticeOfChangeForApplicant1Solicitor(api_spec.getCaseId(), secondDefendantSolicitorUser);
  await api_spec.checkUserCaseAccess(applicantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForApplicant2Solicitor(api_spec.getCaseId(), otherSolicitorUser1);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser1, true);
});


Scenario('notice of change - 2v1 - lip', async ({api_spec, noc}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE_LIP');

  await noc.requestNoticeOfChangeForApplicant1Solicitor(api_spec.getCaseId(), secondDefendantSolicitorUser);
  await noc.requestNoticeOfChangeForApplicant2Solicitor(api_spec.getCaseId(), otherSolicitorUser1);
});

