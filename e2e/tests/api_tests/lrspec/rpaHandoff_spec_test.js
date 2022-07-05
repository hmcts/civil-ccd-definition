const config = require('../../../config.js');

Feature('RPA handoff points tests @rpa-handoff-tests-spec');

Scenario('Defendant response - Full defence', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
 /* await waitForFinishedBusinessProcess(caseId());
  await I.navigateToCaseDetails(caseId());
  await api_spec.assertNoEventsAvailable();
  await api_spec.signOut();*/
}).retry(3);

Scenario('Defendant response- Full admission', async  ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION', 'ONE_V_TWO');
 /* await waitForFinishedBusinessProcess(caseId());
  await api_spec.navigateToCaseDetails(caseNumber);
  await api_spec.assertNoEventsAvailable();
  await api_spec.signOut();*/
}).retry(3);

Scenario('Defendant response- Part admission', async  ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION', 'ONE_V_TWO');
/*  await waitForFinishedBusinessProcess(caseId());
  await api_spec.navigateToCaseDetails(caseNumber);
  await api_spec.assertNoEventsAvailable();
  await api_spec.signOut();*/
}).retry(3);

Scenario('Defendant response- Counter claim', async  ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM', 'ONE_V_TWO');
  /*await waitForFinishedBusinessProcess(caseId());
  await api_spec.navigateToCaseDetails(caseNumber);
  await api_spec.assertNoEventsAvailable();
  await api_spec.signOut();*/
}).retry(3);

