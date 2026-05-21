import BaseDataBuilder from '../../../../../base/base-data-builder';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import claimantResponseDataComponents from './claimant-response-data-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ClaimantResponseDataBuilder extends BaseDataBuilder {
  async buildFastTrack1v1FullDefence() {
    return this.buildData({claimTrack: ClaimTrack.FAST_CLAIM});
  }

  protected async buildData({claimTrack = ClaimTrack.SMALL_CLAIM}: { claimTrack?: ClaimTrack } = {}) {
    const { civilServiceRequests } = this.requestsFactory;
    const defenceResponseDocument =
      await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const draftDirectionsDocument =
      await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);

    return {
      ...claimantResponseDataComponents.respondentResponse,
      ...claimantResponseDataComponents.applicantDefenceResponseDocument(
        defenceResponseDocument,
      ),
      ...claimantResponseDataComponents.fastTrackDq(claimTrack),
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
