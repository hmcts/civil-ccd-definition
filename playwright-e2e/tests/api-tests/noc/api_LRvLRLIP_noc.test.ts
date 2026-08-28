import { test } from '../../../playwright-fixtures/index';

test.describe('LR v LR LIP unspec notice of change api journey',  async () => {
  test('LR v LR LIP spec notice of change', async ({
    ClaimantSolicitorApiSteps,
    OtherDefendantSolicitor2ApiSteps
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimSmall1v2LRLIP();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim1v2LRLIP();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails1v2LRLIP();
    await OtherDefendantSolicitor2ApiSteps.NoticeOfChangeD2();

  });
});
