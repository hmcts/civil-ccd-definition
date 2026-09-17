import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '2v1 unspec full defence api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('2v1 unspec full defence', async ({
      ClaimantSolicitorApiSteps,
      CaseworkerApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimType: ClaimType.TWO_VS_ONE,
        claimTrack: ClaimTrack.FAST_CLAIM,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await CaseworkerApiSteps.AddCaseNote();
      await ClaimantSolicitorApiSteps.AmendClaimDocuments();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await CaseworkerApiSteps.AmendPartyDetails();
      await DefendantSolicitor1ApiSteps.AcknowledgeClaimFullDefence2v1();
      await DefendantSolicitor1ApiSteps.InformAgreedExtensionDate();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence2v1();
      await ClaimantSolicitorApiSteps.RespondFastProceed2v1();
    });
  },
);
