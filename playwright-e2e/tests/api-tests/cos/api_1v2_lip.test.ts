import { test } from '../../../playwright-fixtures/index';

// DTSCCI-5193: service-owned party variations are covered by civil-service integration tests.
// Retain these skipped for local diagnostics; UI and Notice-of-Change journeys cover cross-service wiring.
test.describe.skip('Unspec 1v2lips api journey', { tag: '@civil-service-nightly' }, async () => {
  test('Create claim where one respondent is LIP one is LR and notify/notify details', async ({
    ClaimantSolicitorApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimSmall1v2LRLIP();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim1v2LRLIP();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails1v2LRLIP();
  });

  test('Create claim where two respondents are LIP and notify/notify details', async ({
    ClaimantSolicitorApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimSmall1v2LIPs();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim1v2LIPS();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails1v2LIPS();
  });
});
