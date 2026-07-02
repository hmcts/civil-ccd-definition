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

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class DefendantResponseSpecDataBuilder extends BaseDataBuilder {
  async buildDS1SmallTrackFullDefenceData() {
    return this.buildData();
  }

  async buildDS1FastTrackFullDefenceData() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildDS1FastTrackPartAdmitData() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildDS1SmallTrackPartAdmitData() {
    return this.buildData({
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildDS1FastTrackPartAdmit1v2SSData() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildDS1SmallTrackPartAdmit1v2SSData() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildDS1FastTrackPartAdmit2v1Data() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildDS1SmallTrackPartAdmit2v1Data() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildDS2FastTrackFullDefenceData() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  async buildDS2SmallTrackFullDefenceData() {
    return this.buildData({
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  async buildDS1FastTrack2v1FullDefenceData() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildDS1FastTrackFullDefence1v2SSData() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildDS1SmallTrackFullDefence1v2SSData() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  protected async buildData(
    {
      claimType = ClaimType.ONE_VS_ONE,
      claimTrack = ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType = DefendantResponseSpecType.FULL_DEFENCE,
      defenceRouteSpec = DefenceRouteSpec.DISPUTE,
      defendantSolicitorParty = partys.DEFENDANT_SOLICITOR_1
    }: {
      claimType?: ClaimType;
      claimTrack?: ClaimTrack;
      defendantResponseSpecType?: DefendantResponseSpecType;
      defenceRouteSpec?: DefenceRouteSpec;
      defendantSolicitorParty?: Party
    } = {}
  ) {
    const { civilServiceRequests } = this.requestsFactory;
    const defendantSolicitorUser =
      defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? defendantSolicitor1User
        : defendantSolicitor2User;
    const defenceResponseDocumentSpec =
      await civilServiceRequests.uploadTestDocument(defendantSolicitorUser);

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
      defendantResponseSpecData.upload(defenceResponseDocumentSpec, defendantSolicitorParty),
      defendantResponseSpecData.timeline(defendantSolicitorParty),
      defendantResponseSpecData.mediationContactInformation(claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.mediationAvailability(claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.deterWithoutHearing(claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.fastTrackDq(claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.experts(claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.witnesses(claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.language(defendantSolicitorParty),
      defendantResponseSpecData.hearing(claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.requestedCourtLocation(defendantSolicitorParty),
      defendantResponseSpecData.hearingSupport(defendantSolicitorParty),
      defendantResponseSpecData.vulnerabilityQuestions(defendantSolicitorParty),
      defendantResponseSpecData.applications(claimTrack, defendantSolicitorParty),
      defendantResponseSpecData.statementOfTruth(defendantSolicitorParty),
      defendantResponseSpecData.undefine(defendantSolicitorParty),
    );

    return eventData;
  }
}
