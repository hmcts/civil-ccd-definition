import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2DS spec fast track flight delay claim journey',
  
  async () => {
    test('1v2DS spec fast track flight delay claim journey', async ({
      ClaimantSolicitorSpecSteps,
      ClaimantSolicitorSpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.CreateClaimFast1v2DSFlightDelay();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    });
  },
);
