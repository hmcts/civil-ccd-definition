import { test } from '../../playwright-fixtures/index';

test.describe('Unspecified Small Track 1v2LIPs', async () => {
  test('1v2LIPs Small Track Claimant Notify Claim Notify Claim Details', async ({
    ClaimantSolicitorSteps,
    ClaimantSolicitorApiSteps,
  }) => {
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.CreateClaimSmallTrack1v2LIPs();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorSteps.NotifyClaim1v2LIPS();
    await ClaimantSolicitorSteps.NotifyClaimDetails1v2LIPS();
  });
});
