import { test } from '../../../playwright-fixtures/index';

test.describe('LR v 2 LIPs unspec notice of change api journey', { tag: '@civil-service-nightly' }, async () => {
  test('notice of change - 1v2 - both respondents LiPs to same solicitor', async ({
    ClaimantSolicitorApiSteps,
    OtherDefendantSolicitor1ApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimSmallTrack1v2LIPs();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim1v2LIPS();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails1v2LIPS();
    await OtherDefendantSolicitor1ApiSteps.NoticeOfChangeD1();
    await OtherDefendantSolicitor1ApiSteps.NoticeOfChangeD2()
  });

  test('notice of change - 1v2 - both respondents LiPs to diff solicitor', async ({
    ClaimantSolicitorApiSteps,
    OtherDefendantSolicitor1ApiSteps,
    OtherDefendantSolicitor2ApiSteps
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimSmallTrack1v2LIPs();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim1v2LIPS();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails1v2LIPS();
    await OtherDefendantSolicitor1ApiSteps.NoticeOfChangeD1();
    await OtherDefendantSolicitor2ApiSteps.NoticeOfChangeD2()
  });
});
