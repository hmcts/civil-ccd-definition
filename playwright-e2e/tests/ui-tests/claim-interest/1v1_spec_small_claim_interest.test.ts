import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 spec small claim with interest journey',
  { tag: ['@civil-ccd-nightly', '@ui-claim-interest'] },
  async () => {
    test('1v1 spec small claim same rate interest journey', async ({
      ClaimantSolicitorSpecSteps,
      ClaimantSolicitorSpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.CreateClaimSmall1v1Interest();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    });

    test('1v1 spec small claim break down interest journey', async ({
      ClaimantSolicitorSpecSteps,
      ClaimantSolicitorSpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.CreateClaimSmall1v1BreakDownInterest();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    });

    test('1v1 spec small claim different rate interest from a specific date journey', async ({
      ClaimantSolicitorSpecSteps,
      ClaimantSolicitorSpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.CreateClaimSmall1v1DifferentRateInterestFromSpecificDate();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    });
  },
);
