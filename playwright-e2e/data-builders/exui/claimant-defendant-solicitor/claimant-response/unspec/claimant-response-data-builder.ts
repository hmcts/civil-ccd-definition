import BaseDataBuilder from '../../../../../base/base-data-builder';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import claimantResponseDataComponents from './claimant-response-data-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ClaimantResponseDataBuilder extends BaseDataBuilder {
  async buildSmallFullDefence1v1() {
    return this.buildData();
  }

  async buildFastFullDefence2v1() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM, claimType: ClaimType.TWO_VS_ONE });
  }

  async buildInterFullDefence2v1() {
    return this.buildData({
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      claimType: ClaimType.TWO_VS_ONE,
    });
  }

  async buildMultiFullDefence2v1() {
    return this.buildData({ claimTrack: ClaimTrack.MULTI_CLAIM, claimType: ClaimType.TWO_VS_ONE });
  }

  async buildFastProceed1v2SS() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
    });
  }

  async buildInterProceed1v2DS() {
    return this.buildData({
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
    });
  }

  async buildInterProceed1v2SS() {
    return this.buildData({
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
    });
  }

  async buildMultiProceed1v2SS() {
    return this.buildData({
      claimTrack: ClaimTrack.MULTI_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
    });
  }

  async buildFastFullDefence1v1() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildInterFullDefence1v1() {
    return this.buildData({ claimTrack: ClaimTrack.INTERMEDIATE_CLAIM });
  }

  async buildMultiFullDefence1v1() {
    return this.buildData({ claimTrack: ClaimTrack.MULTI_CLAIM });
  }

  async buildFastFullDefence1v2DS() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
    });
  }

  async buildMultiFullDefence1v2DS() {
    return this.buildData({
      claimTrack: ClaimTrack.MULTI_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
    });
  }

  protected async buildData({
    claimTrack = ClaimTrack.SMALL_CLAIM,
    claimType = ClaimType.ONE_VS_ONE,
  }: {
    claimTrack?: ClaimTrack;
    claimType?: ClaimType;
  } = {}) {
    const { civilServiceRequests } = this.requestsFactory;

    return {
      ...claimantResponseDataComponents.respondentResponse(claimType),
      ...(await claimantResponseDataComponents.applicantDefenceResponseDocument(
        claimType,
        civilServiceRequests,
      )),
      ...claimantResponseDataComponents.fileDirectionsQuestionnaire(claimTrack),
      ...claimantResponseDataComponents.fixedRecoverableCosts(claimTrack),
      ...(await claimantResponseDataComponents.fixedRecoverableCostsIntermediate(
        claimTrack,
        civilServiceRequests,
      )),
      ...claimantResponseDataComponents.disclosureOfElectronicDocuments(claimTrack),
      ...claimantResponseDataComponents.disclosureOfNonElectronicDocuments(claimTrack),
      ...claimantResponseDataComponents.disclosureReport(claimTrack),
      ...claimantResponseDataComponents.deterWithHearing(claimTrack),
      ...claimantResponseDataComponents.experts,
      ...claimantResponseDataComponents.witnesses,
      ...claimantResponseDataComponents.language,
      ...claimantResponseDataComponents.hearing,
      ...(await claimantResponseDataComponents.draftDirections(civilServiceRequests)),
      ...claimantResponseDataComponents.hearingSupport,
      ...claimantResponseDataComponents.vulnerabilityQuestions,
      ...claimantResponseDataComponents.furtherInformation,
      ...claimantResponseDataComponents.statementOfTruth,
    };
  }
}
