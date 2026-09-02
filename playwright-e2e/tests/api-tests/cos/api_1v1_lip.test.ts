import { test } from '../../../playwright-fixtures/index';

// DTSCCI-5193: service-owned claim lifecycle behaviour is covered by civil-service integration tests.
// The Codecept 1v1 @civil-service-smoke journey owns the retained CCD/environment API wiring check.
test.describe.skip('1v1 lip unspec api journey', { tag: '@civil-service-nightly' }, async () => {
  test('Create claim where respondent is litigant in person and notify/notify details', async ({
    ClaimantSolicitorApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimSmall1vLIP();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim1vLIP();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails1vLIP();
  });
});
