import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1vLIP unspec notice of change api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1vLIP unspec notice of change', async ({
      ClaimantSolicitorApiSteps,
      OtherDefendantSolicitor1ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_ONE_LIP });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim1vLIP();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails1vLIP();
      await OtherDefendantSolicitor1ApiSteps.NoticeOfChangeD1();
    });
  },
);
