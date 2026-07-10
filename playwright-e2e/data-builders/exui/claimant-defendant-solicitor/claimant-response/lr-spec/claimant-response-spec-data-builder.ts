import BaseDataBuilder from '../../../../../base/base-data-builder';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import claimantResponseSpecData from './claimant-response-spec-data-components';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimantResponseSpecType from '../../../../../constants/ccd-events/claimant-response-spec-type/claimant-response-spec-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response/lr-spec/defendant-response-spec-type';
import PaymentTypeSpec from '../../../../../constants/ccd-events/defendant-response/lr-spec/payment-type-spec';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ClaimantResponseSpecDataBuilder extends BaseDataBuilder {
  async buildFast() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildIntermediateProceed() {
    return this.buildData({ claimTrack: ClaimTrack.INTERMEDIATE_CLAIM });
  }

  async buildFastPartAdmitProceed() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildIntermediatePartAdmitProceed() {
    return this.buildData({
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildFullAdmitImmediately() {
    return this.buildData({
      defendantResponseSpecType: DefendantResponseSpecType.FULL_ADMISSION,
    });
  }

  async buildFullAdmitSetDate() {
    return this.buildData({
      defendantResponseSpecType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildFullAdmitRepayment() {
    return this.buildData({
      defendantResponseSpecType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildSmallPartAdmitProceed() {
    return this.buildData({
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildFast1v1DoNotProceed() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildFast2v1() {
    return this.buildData({ claimType: ClaimType.TWO_VS_ONE, claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildFast2v1DoNotProceed() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildFast1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFast1v2DS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFast1v2SSDoNotProceed() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildSmall() {
    return this.buildData({ claimTrack: ClaimTrack.SMALL_CLAIM });
  }

  async buildSmall2v1() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  async buildSmall1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  async buildSmall1v2DS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  protected async buildData({
    claimType = ClaimType.ONE_VS_ONE,
    claimTrack = ClaimTrack.FAST_CLAIM,
    claimantResponseType = ClaimantResponseSpecType.PROCEED_WITH_CLAIM,
    defendantResponseSpecType = DefendantResponseSpecType.FULL_DEFENCE,
    paymentTypeSpec = PaymentTypeSpec.IMMEDIATELY
  }: {
    claimType?: ClaimType;
    claimTrack?: ClaimTrack;
    claimantResponseType?: ClaimantResponseSpecType;
    defendantResponseSpecType?: DefendantResponseSpecType,
    paymentTypeSpec?: PaymentTypeSpec,
  } = {}) {
    const { civilServiceRequests } = this.requestsFactory;
    const defenceResponseDocumentSpec =
      defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION
        ? undefined
        : await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const frcSupportingDocument =
      claimTrack === ClaimTrack.INTERMEDIATE_CLAIM
        ? await civilServiceRequests.uploadTestDocument(claimantSolicitorUser)
        : undefined;

    const eventData: Record<string, unknown> = {};

    Object.assign(
      eventData,
      claimantResponseSpecData.undefine(defendantResponseSpecType),
      claimantResponseSpecData.defendantResponse(claimType, claimantResponseType, defendantResponseSpecType),
      claimantResponseSpecData.defendantResponsePartAdmit(defendantResponseSpecType),
      claimantResponseSpecData.claimantDefenceResponseDocument(
        defendantResponseSpecType,
        defenceResponseDocumentSpec,
        claimantResponseType,
      ),
      claimantResponseSpecData.mediationContactInformation(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecData.mediationAvailability(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecData.determinationWithoutHearing(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecData.fastTrackDq(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecData.intermediateTrackDq(
        defendantResponseSpecType,
        claimTrack,
        claimantResponseType,
        frcSupportingDocument,
      ),
      claimantResponseSpecData.experts(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecData.witnesses(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecData.language(defendantResponseSpecType, claimantResponseType),
      claimantResponseSpecData.hearing(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecData.requestedCourtLocation(defendantResponseSpecType, claimantResponseType),
      claimantResponseSpecData.hearingSupport(defendantResponseSpecType, claimantResponseType),
      claimantResponseSpecData.vulnerabilityQuestions(defendantResponseSpecType),
      claimantResponseSpecData.application(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecData.statementOfTruth,
    );

    return eventData;
  }
}
