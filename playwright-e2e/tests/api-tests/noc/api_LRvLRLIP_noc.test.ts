import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  'LR v LR LIP unspec notice of change api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('LR v LR LIP spec notice of change', async ({
      ClaimantSolicitorApiSteps,
      OtherDefendantSolicitor2ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_TWO_LR_LIP });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim1v2LRLIP();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails1v2LRLIP();
      await OtherDefendantSolicitor2ApiSteps.NoticeOfChangeD2();
    });
  },
);
