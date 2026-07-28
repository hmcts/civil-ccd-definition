import { test } from '../../../playwright-fixtures/index';

test.describe('1vLIP unspec notice of change api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1vLIP unspec notice of change', async ({
    ClaimantSolicitorApiSteps,
    OtherDefendantSolicitor1ApiSteps
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimSmallTrack1vLIP();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim1vLIP();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails1vLIP();
    await OtherDefendantSolicitor1ApiSteps.NoticeOfChangeD1();
  });
});
