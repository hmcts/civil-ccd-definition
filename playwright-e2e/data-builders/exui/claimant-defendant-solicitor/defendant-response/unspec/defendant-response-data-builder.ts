import BaseDataBuilder from '../../../../../base/base-data-builder';
import { defendantSolicitor1User, defendantSolicitor2User } from '../../../../../config/users/exui-users';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import DefendantResponseType from '../../../../../constants/ccd-events/defendant-response/unspec/defendant-response-type';
import partys from '../../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { Party } from '../../../../../models/users/partys';
import defendantResponseDataComponents from './defendant-response-data-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class DefendantResponseDataBuilder extends BaseDataBuilder {
  async buildDS1FastTrackFullDefence2v1Data() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.TWO_VS_ONE,
    });
  }

  async buildDS1FastTrackFullDefence1v2SSData() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
    });
  }
  
  async buildDS1FastTrackFullDefenceData() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildDS2FastTrackFullDefenceData() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  protected async buildData(
    {
      claimType = ClaimType.ONE_VS_ONE,
      claimTrack = ClaimTrack.SMALL_CLAIM,
      responseType = DefendantResponseType.FULL_DEFENCE,
      defendantSolicitorParty = partys.DEFENDANT_SOLICITOR_1,
    }: {
      claimType?: ClaimType;
      claimTrack?: ClaimTrack;
      responseType?: DefendantResponseType;
      defendantSolicitorParty?: Party;
    } = {}
  ) {
    const { civilServiceRequests } = this.requestsFactory;
    const defendantSolicitorUser =
      defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? defendantSolicitor1User
        : defendantSolicitor2User;
    const defenceDocument = await civilServiceRequests.uploadTestDocument(defendantSolicitorUser);
    const draftDirectionsDocument =
      await civilServiceRequests.uploadTestDocument(defendantSolicitorUser);

    const eventData: Record<string, unknown> = {};

    Object.assign(
      eventData,
      defendantResponseDataComponents.confirmDetails(claimType, this.ccdCaseData, defendantSolicitorParty),
      defendantResponseDataComponents.singleResponse(claimType),
      defendantResponseDataComponents.respondentResponseType(claimType, responseType, defendantSolicitorParty),
      defendantResponseDataComponents.solicitorReferences(this.ccdCaseData, defendantSolicitorParty),
      defendantResponseDataComponents.upload(defenceDocument, defendantSolicitorParty),
      defendantResponseDataComponents.fastTrackDq(claimTrack, defendantSolicitorParty),
      defendantResponseDataComponents.experts(defendantSolicitorParty),
      defendantResponseDataComponents.witnesses(defendantSolicitorParty),
      defendantResponseDataComponents.language(defendantSolicitorParty),
      defendantResponseDataComponents.hearing(defendantSolicitorParty),
      defendantResponseDataComponents.draftDirections(draftDirectionsDocument, defendantSolicitorParty),
      defendantResponseDataComponents.requestedCourt(defendantSolicitorParty),
      defendantResponseDataComponents.hearingSupport(defendantSolicitorParty),
      defendantResponseDataComponents.vulnerabilityQuestions(defendantSolicitorParty),
      defendantResponseDataComponents.furtherInformation(defendantSolicitorParty),
      defendantResponseDataComponents.statementOfTruth(defendantSolicitorParty),
      defendantResponseDataComponents.undefine(defendantSolicitorParty),
    );

    return eventData;
  }
}
