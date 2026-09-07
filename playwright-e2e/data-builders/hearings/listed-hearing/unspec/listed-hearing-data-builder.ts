import BaseDataBuilder from '../../../../base/base-data-builder';
import ClaimTrack from '../../../../constants/cases/claim-track';
import HearingType from '../../../../constants/hearings/hearing-type';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import listedHearingsDataBuilderComponents from './listed-hearing-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ListedHearingDataBuilder extends BaseDataBuilder {
  async buildTrail() {
    return this.buildData({
      hearingType: HearingType.TRAIL,
      claimTrack: ClaimTrack.FAST_CLAIM
    });
  }

  async buildDisposal() {
    return this.buildData({
      hearingType: HearingType.DISPOSAL_HEARING,
      claimTrack: ClaimTrack.FAST_CLAIM
    });
  }
  async buildTrailV2() {
    return this.buildData({
      hearingType: HearingType.TRAIL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      versionNumber: 2
    });
  }

  async buildDisposalV2() {
    return this.buildData({
      hearingType: HearingType.DISPOSAL_HEARING,
      claimTrack: ClaimTrack.FAST_CLAIM,
      versionNumber: 2
    });
  }

  async buildDrh() {
    return this.buildData({
      hearingType: HearingType.DISPUTE_RESOLUTION,
      claimTrack: ClaimTrack.FAST_CLAIM
    });
  }

  protected async buildData({
    hearingType = HearingType.TRAIL,
    claimTrack = ClaimTrack.SMALL_CLAIM,
    versionNumber = 1
  }: {
    hearingType?: HearingType;
    claimTrack?: ClaimTrack;
    versionNumber?: number
  } = {}) {
    return {
      ...listedHearingsDataBuilderComponents.requestDetails(versionNumber),
      ...listedHearingsDataBuilderComponents.hearingDetails(hearingType, this.ccdCaseData!),
      ...listedHearingsDataBuilderComponents.caseDetails(this.ccdCaseData!, claimTrack),
      ...listedHearingsDataBuilderComponents.partyDetails(),
      ...listedHearingsDataBuilderComponents.hearingResponse(versionNumber),
    };
  }
}
