import BaseDataBuilder from '../../../../base/base-data-builder';
import ClaimTrack from '../../../../constants/cases/claim-track';
import ClaimantResponseCuiType from '../../../../constants/ccd-events/claimant-response-cui/claimant-response-cui-type';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import claimantResponseCuiDataBuilderComponents from './claimant-response-cui-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ClaimantResponseCuiDataBuilder extends BaseDataBuilder {
  async buildSmallRejectFullDefence() {
    return this.buildData();
  }

  async buildSmallRejectPartAdmit() {
    return this.buildData({
      claimantResponseCuiType: ClaimantResponseCuiType.REJECT_PART_ADMIT,
    });
  }

  async buildFastRejectFullDefence() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildInterRejectFullDefence() {
    return this.buildData({
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
    });
  }

  async buildMultiRejectFullDefence() {
    return this.buildData({
      claimTrack: ClaimTrack.MULTI_CLAIM,
    });
  }

  async buildSmallAcceptFullAdmitSetDateCcj() {
    return this.buildData({
      claimantResponseCuiType: ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_SET_DATE_CCJ,
    });
  }

  async buildSmallAcceptFullAdmitRepaymentCcj() {
    return this.buildData({
      claimantResponseCuiType: ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_REPAYMENT_CCJ,
    });
  }

  protected async buildData({
    claimantResponseCuiType = ClaimantResponseCuiType.REJECT_FULL_DEFENCE,
    claimTrack = ClaimTrack.SMALL_CLAIM,
  }: {
    claimantResponseCuiType?: ClaimantResponseCuiType;
    claimTrack?: ClaimTrack;
  } = {}): Promise<Record<string, unknown>> {
    const eventData: Record<string, unknown> = {};

    Object.assign(
      eventData,
      claimantResponseCuiDataBuilderComponents.claimant1(
        claimantResponseCuiType,
        this.claimant1PartyType!,
        this.claimantCitizenUser,
      ),
      claimantResponseCuiDataBuilderComponents.defendant1(
        claimantResponseCuiType,
        this.defendant1PartyType!,
        this.defendantCitizenUser,
      ),
      claimantResponseCuiDataBuilderComponents.lipResponse(
        claimTrack,
        claimantResponseCuiType,
      ),
      claimantResponseCuiDataBuilderComponents.mediation(
        claimTrack,
        claimantResponseCuiType,
      ),
      claimantResponseCuiDataBuilderComponents.language(claimantResponseCuiType),
      claimantResponseCuiDataBuilderComponents.vulnerability(claimantResponseCuiType),
      claimantResponseCuiDataBuilderComponents.requestedCourt(claimantResponseCuiType),
      claimantResponseCuiDataBuilderComponents.witnesses(claimantResponseCuiType),
      claimantResponseCuiDataBuilderComponents.hearingSmallClaim(
        claimTrack,
        claimantResponseCuiType,
      ),
      claimantResponseCuiDataBuilderComponents.experts(
        claimTrack,
        claimantResponseCuiType,
      ),
      claimantResponseCuiDataBuilderComponents.hearingSupport(claimantResponseCuiType),
      claimantResponseCuiDataBuilderComponents.interTrackDirections(
        claimTrack,
        claimantResponseCuiType,
      ),
      claimantResponseCuiDataBuilderComponents.ccjResponse(
        claimTrack,
        claimantResponseCuiType,
        this.ccdCaseData,
      ),
      claimantResponseCuiDataBuilderComponents.claimResponse(claimantResponseCuiType),
    );

    return eventData;
  }
}
