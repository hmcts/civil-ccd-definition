import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2 LIP LR COS notify claim journey',
  { tag: ['@civil-ccd-nightly', '@ui-cos'] },
  () => {
    test('1v2 LIP LR - notify and notify claim details', async ({
      ClaimantSolicitorSteps,
      ClaimantSolicitorApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_TWO_LR_LIP });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.NotifyClaim1v1LIP1LR();
      await ClaimantSolicitorSteps.NotifyClaimDetails1v2LIPLR();
    });
  },
);
