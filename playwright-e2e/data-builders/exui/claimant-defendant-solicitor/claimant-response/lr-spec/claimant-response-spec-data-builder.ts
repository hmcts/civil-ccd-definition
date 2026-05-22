import BaseDataBuilder from '../../../../../base/base-data-builder';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import claimantResponseSpecData from './claimant-response-spec-data-components';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimantResponseSpecType from '../../../../../constants/ccd-events/claimant-response-spec-type/claimant-response-spec-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ClaimantResponseSpecDataBuilder extends BaseDataBuilder {
  async buildFastTrack1v1() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildFastTrack1v1DoNotProceed() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildFastTrack2v1() {
    return this.buildData({ claimType: ClaimType.TWO_VS_ONE, claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildFastTrack2v1DoNotProceed() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildFastTrack1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastTrack1v2SSDoNotProceed() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildSmallTrack1v1() {
    return this.buildData({ claimTrack: ClaimTrack.SMALL_CLAIM });
  }

  async buildSmallTrack1v2SS() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  protected async buildData({
    claimType = ClaimType.ONE_VS_ONE,
    claimTrack = ClaimTrack.FAST_CLAIM,
    claimantResponseType = ClaimantResponseSpecType.PROCEED_WITH_CLAIM,
  }: {
    claimType?: ClaimType;
    claimTrack?: ClaimTrack;
    claimantResponseType?: ClaimantResponseSpecType;
  } = {}) {
    const { civilServiceRequests } = this.requestsFactory;
    const defenceResponseDocumentSpec = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);

    return {
      ...claimantResponseSpecData.defendantResponse(claimType, claimantResponseType),
      ...claimantResponseSpecData.claimantDefenceResponseDocument(defenceResponseDocumentSpec, claimantResponseType),
      ...claimantResponseSpecData.mediationContactInformation(claimTrack, claimantResponseType),
      ...claimantResponseSpecData.mediationAvailability(claimTrack, claimantResponseType),
      ...claimantResponseSpecData.determinationWithoutHearing(claimTrack, claimantResponseType),
      ...claimantResponseSpecData.fastTrackDq(claimTrack, claimantResponseType),
      ...claimantResponseSpecData.experts(claimTrack, claimantResponseType),
      ...claimantResponseSpecData.witnesses(claimTrack, claimantResponseType),
      ...claimantResponseSpecData.language(claimantResponseType),
      ...claimantResponseSpecData.hearing(claimTrack, claimantResponseType),
      ...claimantResponseSpecData.requestedCourtLocation(claimantResponseType),
      ...claimantResponseSpecData.hearingSupport(claimantResponseType),
      ...claimantResponseSpecData.vulnerabilityQuestions,
      ...claimantResponseSpecData.application(claimTrack, claimantResponseType),
      ...claimantResponseSpecData.statementOfTruth,
    };
  }
}
