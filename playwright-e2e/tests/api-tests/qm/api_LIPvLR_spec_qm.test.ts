import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 LIP v LIP and LR v LIP spec api journeys',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 LiP v LR defendant and claimant response', async ({
      ClaimantCitizenApiSteps,
      DefendantSolicitor1ApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimSmall();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await DefendantSolicitor1ApiSteps.NoticeOfChangeD1();
    });
  },
);
