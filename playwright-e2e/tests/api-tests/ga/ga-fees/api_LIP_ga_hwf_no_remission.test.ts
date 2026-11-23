import { test } from '../../../../playwright-fixtures';

/**
 * Covers GA_NOTIFY_HWF, which notifies the applicant when a Help with Fees application on a general
 * application is refused. DTSCCI-6726 moved that process off the bespoke NOTIFY_APPLICANT_LIP_HWF
 * case event onto NOTIFY_EVENT and the Notifier framework, and no functional spec reached it: the
 * process is started only by NO_REMISSION_HWF_GA, PARTIAL_REMISSION_HWF_GA,
 * INVALID_HWF_REFERENCE_GA, UPDATE_HELP_WITH_FEE_NUMBER_GA and MORE_INFORMATION_HWF_GA, and none of
 * those was driven anywhere. FULL_REMISSION_HWF_GA, the only HWF event that was covered, does not
 * start it.
 *
 * The assertion lives in the business process wait inside RefuseHelpWithFeesOnGA. It fails on a
 * Camunda incident, so it catches both ways the migration can break: GaNotifierFactory not
 * resolving the activity id, and CCD refusing NOTIFY_EVENT for the GENERALAPPLICATION case type.
 */
test.describe(
  'LiP general application Help with Fees refused API tests',
  { tag: ['@civil-service-master', '@civil-service-pr', '@api-ga-fees'] },
  () => {
    test('HWF refused on a LiP general application notifies the applicant', async ({
      ClaimantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
      CtscAdminApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimSmall();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await ClaimantCitizenApiSteps.InitiateGAWithHelpWithFees();
      await CtscAdminApiSteps.RefuseHelpWithFeesOnGA();
    });
  },
);
