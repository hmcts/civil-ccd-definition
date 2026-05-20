import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2DS spec fast track flight delay claim journey',
  { tag: '@civil-ccd-nightly' },
  async () => {
    test('1v2DS spec fast track flight delay claim journey @debug', async ({
      ClaimantSolicitorSpecSteps,
      ClaimantSolicitorSpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.CreateClaimFastTrack1v2DSFlightDelay();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    });
  },
);
