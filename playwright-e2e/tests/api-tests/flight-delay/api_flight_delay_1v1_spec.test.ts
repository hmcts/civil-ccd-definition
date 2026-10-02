import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import FlightDelayClaim from '../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/flight-delay-claim';
import Airline from '../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/airline';

test.describe(
  '1v1 spec flight delay api journey',
  { tag: ['@civil-service-nightly', '@api-flight-delay'] },
  async () => {
    test('1v1 spec flight delay other airline api', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      JudgeApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        flightDelayClaim: FlightDelayClaim.YES,
        airline: Airline.OTHER,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
      });
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await JudgeApiSteps.SdoSmallNoSumFlightDelay();
    });

    test('1v1 spec flight delay api', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      JudgeApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ flightDelayClaim: FlightDelayClaim.YES });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
      });
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await JudgeApiSteps.SdoSmallSumFlightDelay();
    });
  },
);
