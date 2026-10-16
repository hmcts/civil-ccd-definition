import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import claimantResponseSpecData from './claimant-response-spec-data-components';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimantResponseSpecType from '../../../../../constants/ccd-events/ccd-events/claimant-response-spec/claimant-response-spec-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ClaimantResponseSpecDataBuilder extends BaseDataBuilder {
  async buildFastRejectFullDefence() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildInterRejectFullDefence() {
    return this.buildData({ claimTrack: ClaimTrack.INTERMEDIATE_CLAIM });
  }

  async buildInterProceed1v2DS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
    });
  }

  async buildMultiRejectFullDefence() {
    return this.buildData({ claimTrack: ClaimTrack.MULTI_CLAIM });
  }

  async buildMultiRejectFullDefence1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.MULTI_CLAIM,
    });
  }

  async buildMultiRejectFullDefence1v2DS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.MULTI_CLAIM,
    });
  }

  async buildFastRejectPartAdmit() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT,
    });
  }

  async buildSmallRejectPartAdmitPaidConfirmNotPaid() {
    return this.buildData({
      claimTrack: ClaimTrack.SMALL_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT_PAID_CONFIRM_NOT_PAID,
    });
  }

  async buildSmallRejectPartAdmitPaidConfirmPaid() {
    return this.buildData({
      claimTrack: ClaimTrack.SMALL_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT_PAID_CONFIRM_PAID,
    });
  }

  async buildInterRejectPartAdmit() {
    return this.buildData({
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT,
    });
  }

  async buildMultiRejectPartAdmit() {
    return this.buildData({
      claimTrack: ClaimTrack.MULTI_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT,
    });
  }

  async buildFullAdmitImmediately() {
    return this.buildData({
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_ADMIT,
    });
  }

  async buildFullAdmitSetDate() {
    return this.buildData({
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_ADMIT,
    });
  }

  async buildFullAdmitRepayment() {
    return this.buildData({
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_ADMIT,
    });
  }

  async buildSmallRejectPartAdmit() {
    return this.buildData({
      claimTrack: ClaimTrack.SMALL_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT,
    });
  }

  async buildFastRejectFullDefence2v1() {
    return this.buildData({ claimType: ClaimType.TWO_VS_ONE, claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildFastAcceptFullDefence2v1() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_DEFENCE,
    });
  }

  async buildFastRejectFullDefence1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastRejectFullDefence1v2DS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastAcceptFullDefence1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_DEFENCE,
    });
  }

  async buildSmallRejectFullDefence() {
    return this.buildData({ claimTrack: ClaimTrack.SMALL_CLAIM });
  }

  async buildSmallRejectFullDefence2v1() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  async buildSmallRejectFullDefence1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  async buildSmallRejectFullDefence1v2DS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  async buildAcceptFullAdmitRepayment() {
    return this.buildData({
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_ADMIT_REPAYMENT,
    });
  }

  protected async buildData({
    claimType = ClaimType.ONE_VS_ONE,
    claimTrack = ClaimTrack.FAST_CLAIM,
    claimantResponseSpecType = ClaimantResponseSpecType.REJECT_FULL_DEFENCE,
  }: {
    claimType?: ClaimType;
    claimTrack?: ClaimTrack;
    claimantResponseSpecType?: ClaimantResponseSpecType;
  } = {}) {
    const { civilServiceRequests } = this.requestsFactory;

    const eventData: Record<string, unknown> = {};

    Object.assign(
      eventData,
      claimantResponseSpecData.undefine(claimantResponseSpecType),
      claimantResponseSpecData.defendantResponse(claimType, claimantResponseSpecType),
      claimantResponseSpecData.ccjPaymentPaidSome(claimantResponseSpecType),
      claimantResponseSpecData.intentionToSettle(claimantResponseSpecType),
      claimantResponseSpecData.fixedCost(claimantResponseSpecType),
      await claimantResponseSpecData.claimantDefenceResponseDocument(
        claimantResponseSpecType,
        civilServiceRequests,
      ),
      claimantResponseSpecData.mediationContactInformation(claimTrack, claimantResponseSpecType),
      claimantResponseSpecData.mediationAvailability(claimTrack, claimantResponseSpecType),
      claimantResponseSpecData.determinationWithoutHearing(claimTrack, claimantResponseSpecType),
      claimantResponseSpecData.fileDirectionsQuestionnaire(claimTrack, claimantResponseSpecType),
      claimantResponseSpecData.fixedRecoverableCosts(claimTrack, claimantResponseSpecType),
      await claimantResponseSpecData.fixedRecoverableCostsIntermediate(
        claimTrack,
        claimantResponseSpecType,
        civilServiceRequests,
      ),
      claimantResponseSpecData.disclosureOfElectronicDocuments(claimTrack, claimantResponseSpecType),
      claimantResponseSpecData.disclosureOfNonElectronicDocuments(claimTrack, claimantResponseSpecType),
      claimantResponseSpecData.disclosureReport(claimTrack, claimantResponseSpecType),
      claimantResponseSpecData.experts(claimTrack, claimantResponseSpecType),
      claimantResponseSpecData.witnesses(claimTrack, claimantResponseSpecType),
      claimantResponseSpecData.language(claimantResponseSpecType),
      claimantResponseSpecData.hearing(claimTrack, claimantResponseSpecType),
      claimantResponseSpecData.requestedCourtLocation(claimantResponseSpecType),
      claimantResponseSpecData.hearingSupport(claimantResponseSpecType),
      claimantResponseSpecData.vulnerabilityQuestions(claimantResponseSpecType),
      claimantResponseSpecData.application(claimTrack, claimantResponseSpecType),
      claimantResponseSpecData.ccjJudgmentSummary(claimantResponseSpecType),
      claimantResponseSpecData.statementOfTruth,
    );

    return eventData;
  }
}
