import BaseDataBuilder from '../../../../base/base-data-builder';
import ClaimTrack from '../../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../../constants/ccd-events/cui-ccd-events/defendant-response-cui/defendant-response-spec-type';
import PaymentTypeSpec from '../../../../constants/ccd-events/cui-ccd-events/defendant-response-cui/payment-type-spec';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import defendantResponseCuiDataBuilderComponents from './defendant-response-cui-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class DefendantResponseCuiDataBuilder extends BaseDataBuilder {
  async buildSmallFullDefence() {
    return this.buildData();
  }

  async buildFastFullDefence() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildInterFullDefence() {
    return this.buildData({ claimTrack: ClaimTrack.INTERMEDIATE_CLAIM });
  }

  async buildMultiFullDefence() {
    return this.buildData({ claimTrack: ClaimTrack.MULTI_CLAIM });
  }

  async buildFastFullAdmitImmediately() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.IMMEDIATELY,
    });
  }

  async buildFastFullAdmitSetDate() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildFastFullAdmitRepayment() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildSmallFullAdmitImmediately() {
    return this.buildData({
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.IMMEDIATELY,
    });
  }

  async buildSmallFullAdmitSetDate() {
    return this.buildData({
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildSmallFullAdmitRepayment() {
    return this.buildData({
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildSmallPartAdmitImmediately() {
    return this.buildData({
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.IMMEDIATELY,
    });
  }

  async buildFastPartAdmitImmediately() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.IMMEDIATELY,
    });
  }

  async buildSmallPartAdmitSetDate() {
    return this.buildData({
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildFastPartAdmitSetDate() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildSmallPartAdmitRepayment() {
    return this.buildData({
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildFastPartAdmitRepayment() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  protected async buildData({
    defendantResponseType = DefendantResponseSpecType.FULL_DEFENCE,
    paymentTypeSpec = PaymentTypeSpec.IMMEDIATELY,
    claimTrack = ClaimTrack.SMALL_CLAIM,
  }: {
    defendantResponseType?: DefendantResponseSpecType;
    paymentTypeSpec?: PaymentTypeSpec;
    claimTrack?: ClaimTrack;
  } = {}): Promise<Record<string, unknown>> {
    const eventData: Record<string, unknown> = {};

    Object.assign(
      eventData,
      defendantResponseCuiDataBuilderComponents.responseType(defendantResponseType),
      defendantResponseCuiDataBuilderComponents.paymentTimeRoute(
        claimTrack,
        defendantResponseType,
        paymentTypeSpec,
      ),
      defendantResponseCuiDataBuilderComponents.partAdmitPaymentDetails(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiDataBuilderComponents.totalClaimAmount(claimTrack),
      defendantResponseCuiDataBuilderComponents.defendant1(
        this.defendant1PartyType!,
        this.defendantCitizenUser,
      ),
      defendantResponseCuiDataBuilderComponents.lipResponse(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiDataBuilderComponents.mediation(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiDataBuilderComponents.disputeDetails(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiDataBuilderComponents.language(defendantResponseType),
      defendantResponseCuiDataBuilderComponents.vulnerability(defendantResponseType),
      defendantResponseCuiDataBuilderComponents.requestedCourt(defendantResponseType),
      defendantResponseCuiDataBuilderComponents.witnesses(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiDataBuilderComponents.hearingSmallClaim(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiDataBuilderComponents.hearingFastClaim(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiDataBuilderComponents.experts(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiDataBuilderComponents.hearingSupport(defendantResponseType),
      defendantResponseCuiDataBuilderComponents.interMultiTrackDirections(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiDataBuilderComponents.financialDetails(
        defendantResponseType,
        paymentTypeSpec,
      ),
      defendantResponseCuiDataBuilderComponents.respondentResponsePcq(),
    );

    return eventData;
  }
}
