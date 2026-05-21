import BaseDataBuilder from '../../../../../base/base-data-builder';
import { defendantSolicitor1User } from '../../../../../config/users/exui-users';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import DefendantResponseType from '../../../../../constants/ccd-events/defendant-response/unspec/defendant-response-type';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import defendantResponseDataComponents from './defendant-response-data-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class DefendantResponseDataBuilder extends BaseDataBuilder {
  async buildFastTrack1v1FullDefence() {
    return this.buildData({claimTrack: ClaimTrack.FAST_CLAIM});
  }

  protected async buildData(
    {
      claimTrack = ClaimTrack.SMALL_CLAIM,
      responseType = DefendantResponseType.FULL_DEFENCE,
    }: {
      claimTrack?: ClaimTrack;
      responseType?: DefendantResponseType;
    } = {}
  ) {
    const { civilServiceRequests } = this.requestsFactory;
    const defenceDocument = await civilServiceRequests.uploadTestDocument(defendantSolicitor1User);
    const draftDirectionsDocument =
      await civilServiceRequests.uploadTestDocument(defendantSolicitor1User);

    return {
      ...defendantResponseDataComponents.confirmDetails(this.ccdCaseData),
      ...defendantResponseDataComponents.respondentResponseType(responseType),
      ...defendantResponseDataComponents.upload(defenceDocument),
      ...defendantResponseDataComponents.fastTrackDq(claimTrack),
      ...defendantResponseDataComponents.experts,
      ...defendantResponseDataComponents.witnesses,
      ...defendantResponseDataComponents.language,
      ...defendantResponseDataComponents.hearing,
      ...defendantResponseDataComponents.draftDirections(draftDirectionsDocument),
      ...defendantResponseDataComponents.requestedCourt(),
      ...defendantResponseDataComponents.hearingSupport,
      ...defendantResponseDataComponents.vulnerabilityQuestions,
      ...defendantResponseDataComponents.furtherInformation,
      ...defendantResponseDataComponents.statementOfTruth,
    };
  }
}
