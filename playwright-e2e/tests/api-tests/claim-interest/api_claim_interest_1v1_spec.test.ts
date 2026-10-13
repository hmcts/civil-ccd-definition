import { test } from '../../../playwright-fixtures/index';
import ClaimInterest from '../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/claim-interest';
import InterestClaimOption from '../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/interest-claim-option';
import SameRateInterestType from '../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/same-rate-interest-type';
import InterestClaimFromOption from '../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/interest-claim-from-option';
import InterestClaimUntilOption from '../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/interest-claim-until-option';

test.describe(
  '1v1 spec create claim with interest api journey',
  { tag: ['@civil-service-nightly', '@api-claim-interest'] },
  async () => {
    test('1v1 spec create claim same rate interest 8 percent api', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimInterest: ClaimInterest.YES,
        interestClaimOption: InterestClaimOption.SAME_RATE_INTEREST,
        sameRateInterestType: SameRateInterestType.EIGHT_PERCENT,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    });

    test('1v1 spec create claim same rate interest different rate api', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimInterest: ClaimInterest.YES,
        interestClaimOption: InterestClaimOption.SAME_RATE_INTEREST,
        sameRateInterestType: SameRateInterestType.DIFFERENT_RATE,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    });

    test('1v1 spec create claim break down interest api', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimInterest: ClaimInterest.YES,
        interestClaimOption: InterestClaimOption.BREAK_DOWN_INTEREST,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    });

    test('1v1 spec create claim break down interest from a specific date api', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimInterest: ClaimInterest.YES,
        interestClaimOption: InterestClaimOption.BREAK_DOWN_INTEREST,
        interestClaimFrom: InterestClaimFromOption.FROM_A_SPECIFIC_DATE,
        interestClaimUntil: InterestClaimUntilOption.UNTIL_SETTLED_OR_JUDGEMENT_MADE,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    });

    test('1v1 spec create claim same rate interest from a specific date until claim submit date api', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimInterest: ClaimInterest.YES,
        interestClaimOption: InterestClaimOption.SAME_RATE_INTEREST,
        sameRateInterestType: SameRateInterestType.EIGHT_PERCENT,
        interestClaimFrom: InterestClaimFromOption.FROM_A_SPECIFIC_DATE,
        interestClaimUntil: InterestClaimUntilOption.UNTIL_CLAIM_SUBMIT_DATE,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    });
  },
);
