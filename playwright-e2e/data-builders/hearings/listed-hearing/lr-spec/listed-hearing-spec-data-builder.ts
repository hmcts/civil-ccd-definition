import BaseDataBuilder from '../../../../base/base-data-builder';
import ClaimTrack from '../../../../constants/cases/claim-track';
import HearingType from '../../../../constants/hearings/hearing-type';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import listedHearingSpecDataBuilderComponents from './listed-hearing-spec-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ListedHearingSpecDataBuilder extends BaseDataBuilder {
  async buildTrail() {
    return this.buildData({
      hearingType: HearingType.TRAIL,
    });
  }

  async buildDisposal() {
    return this.buildData({
      hearingType: HearingType.DISPOSAL_HEARING,
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
      ...listedHearingSpecDataBuilderComponents.requestDetails(versionNumber),
      ...listedHearingSpecDataBuilderComponents.hearingDetails(hearingType, this.ccdCaseData),
      ...listedHearingSpecDataBuilderComponents.caseDetails(this.ccdCaseData, claimTrack),
      ...listedHearingSpecDataBuilderComponents.partyDetails(),
      ...listedHearingSpecDataBuilderComponents.hearingResponse(versionNumber),
    };
  }
}
