const config = require('../../../config');

// Skipped for now: failing in CI on a shared restHelper 'Headers' TypeError, not a test-logic issue.
Feature('Spec automated hearing notice schedulers').tag('@civil-service-pr @api-hearings');

let caseId;

BeforeSuite(async ({hearings}) => {
  await hearings.setupStaticMocks();
});

Scenario.skip('01 Create Spec claim with SDO', async ({api_spec_small}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', false, false);
  caseId = await api_spec_small.getCaseId();
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE');
  await api_spec_small.claimantResponse(config.applicantSolicitorUser, true, 'No', false);
  await api_spec_small.createSDO(config.judgeUser2WithRegionId2, 'CREATE_SMALL', true);
}).retry(3);

Scenario.skip('02 Generate Spec Disposal hearing notice', async ({hearings}) => {
  const hearingId = await hearings.createSpecDisposalHearing(caseId);
  await hearings.triggerSpecAutomatedHearingNoticeScheduler(hearingId);
}).retry(3);

Scenario.skip('03 Generate Spec Trial hearing notice', async ({hearings}) => {
  const hearingId = await hearings.createSpecTrialHearing(caseId);
  await hearings.triggerSpecAutomatedHearingNoticeScheduler(hearingId);
}).retry(3);

Scenario.skip('04 Generate Spec Dispute Resolution hearing notice', async ({hearings}) => {
  const hearingId = await hearings.createSpecDisputeResolutionHearing(caseId);
  await hearings.triggerSpecAutomatedHearingNoticeScheduler(hearingId);
}).retry(3);

AfterSuite(async ({api}) => {
  await api.cleanUp();
});