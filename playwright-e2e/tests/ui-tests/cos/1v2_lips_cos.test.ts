import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2 LIPs COS notify claim journey',
  { tag: ['@civil-ccd-nightly', '@ui-cos'] },
  () => {
    test('1v2 LIPs - notify and notify claim details', async ({
      ClaimantSolicitorSteps,
      ClaimantSolicitorApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_TWO_LIPS });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.NotifyClaim1v2LIPS();
      await ClaimantSolicitorSteps.NotifyClaimDetails1v2LIPS();
    });
  },
);
