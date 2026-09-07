const config = require('../../../config.js');

Feature('Inform agreed extension date spec notifications').tag('@civil-service-nightly @api-spec-full-defence @dtscci-5893');

Scenario('1v1 spec - respondent solicitor 1 agrees extension - applicant solicitor notified', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  let caseId = await api_spec.getCaseId();

  await api_spec.informAgreedExtensionDate(config.defendantSolicitorUser);
  await api_spec.submitAgreedExtensionDate();

  await api_spec.assertAllPartiesExtensionEmailsSent(caseId, 2);
});

Scenario('1v2DS spec - respondent solicitor 2 agrees extension, respondent 1 did not - applicant solicitor notified without NPE [DTSCCI-5893]', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');
  let caseId = await api_spec.getCaseId();

  await api_spec.informAgreedExtensionDateRespondent2(config.secondDefendantSolicitorUser);

  await api_spec.assertAllPartiesExtensionEmailsSent(caseId, 3);
});

Scenario('2v1 spec - respondent solicitor 1 agrees extension - applicant solicitor notified', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  let caseId = await api_spec.getCaseId();

  await api_spec.informAgreedExtensionDate(config.defendantSolicitorUser);
  await api_spec.submitAgreedExtensionDate();

  await api_spec.assertAllPartiesExtensionEmailsSent(caseId, 2);
});

AfterSuite(async ({api_spec}) => {
  await api_spec.cleanUp();
});
