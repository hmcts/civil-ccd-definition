import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2DS spec fast track flight delay claim journey @debug',
  { tag: '@civil-ccd-nightly @ui-flight-delay' },
  async () => {
    test('1v2DS spec fast track flight delay claim journey', async ({
      ClaimantSolicitorSpecSteps,
    }) => {
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.CreateClaimFastTrack1v2DSFlightDelay();
    });
  },
);
