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

  let caseId = await api_spec.getCaseId();

  await noc.requestNoticeOfChangeForApplicant1Solicitor(caseId, secondDefendantSolicitorUser);
  await api_spec.checkUserCaseAccess(applicantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, otherSolicitorUser1);
  await api_spec.checkUserCaseAccess(defendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser1, true);
});

// todo check orgs exist in preview/demo/aat
Scenario.skip('notice of change - 1v2 - both defendants represented', async ({api_spec, noc}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');

  let caseId = await api_spec.getCaseId();

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, otherSolicitorUser1);
  await api_spec.checkUserCaseAccess(defendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser1, true);

  await noc.requestNoticeOfChangeForRespondent2SolicitorSpec(caseId, otherSolicitorUser2);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser2, true);
});

// todo check orgs exist in preview/demo/aat
Scenario.skip('notice of change - 1v2 - same solicitor', async ({api_spec, noc}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');

  let caseId = await api_spec.getCaseId();

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, otherSolicitorUser1);
  await api_spec.checkUserCaseAccess(defendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser1, true);

  await noc.requestNoticeOfChangeForRespondent2SolicitorSpec(caseId, otherSolicitorUser2);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser2, true);
});

Scenario('notice of change - 2v1', async ({api_spec, noc}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');

  let caseId = await api_spec.getCaseId();

  await noc.requestNoticeOfChangeForApplicant1Solicitor(caseId, secondDefendantSolicitorUser);
  await api_spec.checkUserCaseAccess(applicantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(secondDefendantSolicitorUser, true);

  await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, otherSolicitorUser1);
  await api_spec.checkUserCaseAccess(defendantSolicitorUser, false);
  await api_spec.checkUserCaseAccess(otherSolicitorUser1, true);
});

