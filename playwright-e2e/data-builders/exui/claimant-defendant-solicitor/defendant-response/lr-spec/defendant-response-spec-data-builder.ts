import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response/lr-spec/defendant-response-spec-type';
import defendantResponseSpecData from './defendant-response-spec-data-components';
import { defendantSolicitor1User, defendantSolicitor2User } from '../../../../../config/users/exui-users';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import partys from '../../../../../constants/users/partys';
import { Party } from '../../../../../models/users/partys';
import DefenceRouteSpec from '../../../../../constants/ccd-events/defendant-response/lr-spec/defence-route-spec';
import PaymentTypeSpec from '../../../../../constants/ccd-events/defendant-response/lr-spec/payment-type-spec';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class DefendantResponseSpecDataBuilder extends BaseDataBuilder {
  async buildDS1SmallFullDefence() {
    return this.buildData();
  }

  async buildDS1FastFullDefence() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildDS1IntermediateFullDefence() {
    return this.buildData({
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
    });
  }

  async buildDS1CounterClaim() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.COUNTER_CLAIM,
    });
  }

  async buildDS1FastPartAdmitImmediately() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildDS1IntermediatePartAdmitImmediately() {
    return this.buildData({
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildDS1SmallPartAdmitImmediately() {
    return this.buildData({
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildDS1FastPartAdmitSetDate1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildDS1SmallPartAdmitSetDate1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildDS1FastPartAdmitRepayment2v1() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildDS1SmallPartAdmitRepayment2v1() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildDS2FastFullDefence() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  async buildDS2IntermediateFullDefence() {
    return this.buildData({
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  async buildDS2SmallFullDefence() {
    return this.buildData({
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  async buildDS1Fast2v1FullDefence() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildDS1CounterClaim2v1() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.COUNTER_CLAIM,
    });
  }

  async buildDS1FastFullDefence1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildDS1IntermediateFullDefence1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
    });
  }

  async buildDS1CounterClaim1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.COUNTER_CLAIM,
    });
  }

  async buildDS1SmallFullDefence1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  async buildDS1FullAdmitImmediately() {
    return this.buildData({
      defendantResponseSpecType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.IMMEDIATELY,
    });
  }

  async buildDS1FullAdmitSetDate1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      defendantResponseSpecType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildDS1FullAdmitRepayment2v1() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      defendantResponseSpecType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  protected async buildData(
    {
      claimType = ClaimType.ONE_VS_ONE,
      claimTrack = ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType = DefendantResponseSpecType.FULL_DEFENCE,
      defenceRouteSpec = DefenceRouteSpec.DISPUTE,
      paymentTypeSpec = PaymentTypeSpec.IMMEDIATELY,
      defendantSolicitorParty = partys.DEFENDANT_SOLICITOR_1
    }: {
      claimType?: ClaimType;
      claimTrack?: ClaimTrack;
      defendantResponseSpecType?: DefendantResponseSpecType;
      defenceRouteSpec?: DefenceRouteSpec;
      paymentTypeSpec?: PaymentTypeSpec;
      defendantSolicitorParty?: Party
    } = {}
  ) {
    const { civilServiceRequests } = this.requestsFactory;
    const defendantSolicitorUser =
      defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? defendantSolicitor1User
        : defendantSolicitor2User;
    let frcSupportingDocument;
    const defenceResponseDocumentSpec =
      await civilServiceRequests.uploadTestDocument(defendantSolicitorUser);
    if(claimTrack === ClaimTrack.INTERMEDIATE_CLAIM) {
      frcSupportingDocument =
        await civilServiceRequests.uploadTestDocument(defendantSolicitorUser);
    }

    const eventData: Record<string, unknown> = {};

    Object.assign(
      eventData,
      defendantResponseSpecData.defendantChecklist,
      defendantResponseSpecData.responseConfirmNameAddress(claimType, defendantSolicitorParty),
      defendantResponseSpecData.responseConfirmDetails(defendantSolicitorParty),
      defendantResponseSpecData.singleResponse(claimType),
      defendantResponseSpecData.respondentResponseTypeSpec(
        defendantResponseSpecType,
        claimType,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.defenceRoute(defendantResponseSpecType, defenceRouteSpec, claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.defenceAdmittedPartRoute(defendantResponseSpecType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.upload(defendantResponseSpecType, defenceResponseDocumentSpec, defendantSolicitorParty),
      defendantResponseSpecData.timeline(defendantResponseSpecType, defendantSolicitorParty),
      defendantResponseSpecData.whenWillClaimBePaid(defendantResponseSpecType, paymentTypeSpec, defendantSolicitorParty),
      defendantResponseSpecData.defendant1FinancialDetails(defendantResponseSpecType, paymentTypeSpec, defendantSolicitorParty),
      defendantResponseSpecData.defendant2FinancialDetails(defendantResponseSpecType, paymentTypeSpec, claimType, defendantSolicitorParty),
      defendantResponseSpecData.defendant1RepaymentPlan(defendantResponseSpecType, paymentTypeSpec, defendantSolicitorParty),
      defendantResponseSpecData.defendant2RepaymentPlan(defendantResponseSpecType, paymentTypeSpec, claimType, defendantSolicitorParty),
      defendantResponseSpecData.mediationContactInformation(defendantResponseSpecType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.mediationAvailability(defendantResponseSpecType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.deterWithoutHearing(defendantResponseSpecType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.fastTrackDq(defendantResponseSpecType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.intermediateTrackDq(defendantResponseSpecType, claimTrack, defendantSolicitorParty, frcSupportingDocument),
      defendantResponseSpecData.experts(defendantResponseSpecType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.witnesses(defendantResponseSpecType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.language(defendantResponseSpecType, defendantSolicitorParty),
      defendantResponseSpecData.hearing(defendantResponseSpecType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.requestedCourtLocation(defendantResponseSpecType, defendantSolicitorParty),
      defendantResponseSpecData.hearingSupport(defendantResponseSpecType, defendantSolicitorParty),
      defendantResponseSpecData.vulnerabilityQuestions(defendantResponseSpecType, defendantSolicitorParty),
      defendantResponseSpecData.applications(defendantResponseSpecType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.statementOfTruth(defendantSolicitorParty),
      defendantResponseSpecData.undefine(defendantSolicitorParty),
    );

    return eventData;
  }
}
