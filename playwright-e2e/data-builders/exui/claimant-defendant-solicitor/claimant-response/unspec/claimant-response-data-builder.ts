import BaseDataBuilder from '../../../../../base/base-data-builder';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import claimantResponseDataComponents from './claimant-response-data-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ClaimantResponseDataBuilder extends BaseDataBuilder {
  async buildSmallFullDefence1v1Data() {
    return this.buildData();
  }

  async buildFastFullDefence2v1Data() {
    return this.buildData({claimTrack: ClaimTrack.FAST_CLAIM, claimType: ClaimType.TWO_VS_ONE});
  }

  async buildFastProceed1v2SSData() {
    return this.buildData({claimTrack: ClaimTrack.FAST_CLAIM, claimType: ClaimType.ONE_VS_TWO_SAME_SOL});
  }

  async buildFastFullDefence1v1Data() {
    return this.buildData({claimTrack: ClaimTrack.FAST_CLAIM});
  }

  async buildFastFullDefence1v2DSData() {
    return this.buildData({claimTrack: ClaimTrack.FAST_CLAIM, claimType: ClaimType.ONE_VS_TWO_DIFF_SOL});
  }

  protected async buildData(
    {
      claimTrack = ClaimTrack.SMALL_CLAIM, 
      claimType = ClaimType.ONE_VS_ONE
    } : 
    { 
      claimTrack?: ClaimTrack, 
      claimType?: ClaimType 
    } = {}) {
    const { civilServiceRequests } = this.requestsFactory;
    const defenceResponseDocument1 =
      await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    let defenceResponseDocument2;
    if(claimType === ClaimType.ONE_VS_TWO_DIFF_SOL) {
      defenceResponseDocument2 =
        await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    }
    const draftDirectionsDocument =
      await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);

    return {
      ...claimantResponseDataComponents.respondentResponse(claimType),
      ...claimantResponseDataComponents.applicantDefenceResponseDocument(
        claimType,
        defenceResponseDocument1,
        defenceResponseDocument2!,
      ),
      ...claimantResponseDataComponents.fastTrackDq(claimTrack),
      ...claimantResponseDataComponents.deterWithHearing(claimTrack),
      ...claimantResponseDataComponents.experts,
      ...claimantResponseDataComponents.witnesses,
      ...claimantResponseDataComponents.language,
      ...claimantResponseDataComponents.hearing,
      ...claimantResponseDataComponents.draftDirections(draftDirectionsDocument),
      ...claimantResponseDataComponents.hearingSupport,
      ...claimantResponseDataComponents.vulnerabilityQuestions,
      ...claimantResponseDataComponents.furtherInformation,
      ...claimantResponseDataComponents.statementOfTruth,
    };
  }
}
