const config = require('../../../config.js');

Feature('RPA handoff points api tests');

Scenario('01 Defendant response  and claimant intention - Full defence', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
}).retry(3);

Scenario('02 Defendant response and claimant intention - Full admission', async  ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION', 'ONE_V_TWO');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION', 'ONE_V_TWO');
}).retry(3);

Scenario('03 Defendant response and claimant intention - Part admission', async  ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION', 'ONE_V_TWO');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'PART_ADMISSION', 'ONE_V_TWO');
}).retry(3);

Scenario('04 Defendant response - Counter claim', async  ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM', 'ONE_V_TWO');
}).retry(3);

Scenario('05 Defendant response and claimant intention - 1v1 Full admission', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'FULL_ADMISSION');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION');
});

Scenario('06 Defendant response and claimant intention - 1v1 Part admission', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'PART_ADMISSION');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'PART_ADMISSION');
});

Scenario('07 Defendant response  - 1v1-counter claim', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM');
});
