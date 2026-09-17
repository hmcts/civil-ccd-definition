import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  'Spec 1v1 judgment by admission mark paid in full api test',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 LR v LR defendant response with full admit pay by set date judgment by admission mark paid in full', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondFullAdmitSetDate();
      await ClaimantSolicitorSpecApiSteps.RespondAcceptFullAdmitRepayment();
      await ClaimantSolicitorSpecApiSteps.JudgmentPaidInFull();
    });
  },
);
