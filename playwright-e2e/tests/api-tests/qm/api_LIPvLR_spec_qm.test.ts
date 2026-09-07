import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 LIP v LIP and LR v LIP spec api journeys',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 LiP v LR defendant and claimant response', async ({
      ClaimantCitizenApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CtscAdminApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimSmall();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await DefendantSolicitor1SpecApiSteps.NoticeOfChangeD1();
      await DefendantSolicitor1SpecApiSteps.RaiseLRQuery();
      await ClaimantCitizenApiSteps.RaiseLipQuery();
      await CtscAdminApiSteps.RespondToQuery();
      await ClaimantCitizenApiSteps.FollowUpOnLipQuery();
      await DefendantSolicitor1SpecApiSteps.RaiseLRQuery();
      await CtscAdminApiSteps.RespondToQuery();
      await DefendantSolicitor1SpecApiSteps.FollowUpOnLRQuery();
    });
  },
);
