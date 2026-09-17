import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe('1v1 lip unspec api journey', { tag: '@civil-service-nightly' }, async () => {
  test('Create claim where respondent is litigant in person and notify/notify details', async ({
    ClaimantSolicitorApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_ONE_LIP });
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim1vLIP();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails1vLIP();
  });
});
