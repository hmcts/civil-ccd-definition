import BaseDataBuilder from '../../../../base/base-data-builder';
import ClaimTrack from '../../../../constants/cases/claim-track';
import ClaimType from '../../../../constants/cases/claim-type';
import claimantDefendantPartyTypes from '../../../../constants/users/claimant-defendant-party-types';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import { ClaimantDefendantPartyType } from '../../../../models/users/claimant-defendant-party-types';
import createClaimData from './create-lip-claim-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class CreateLipClaimDataBuilder extends BaseDataBuilder {
  async buildSmall() {
    return this.buildData({ claimTrack: ClaimTrack.SMALL_CLAIM });
  }

  async buildFast() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildIntermediate() {
    return this.buildData({ claimTrack: ClaimTrack.INTERMEDIATE_CLAIM });
  }

  async buildMulti() {
    return this.buildData({ claimTrack: ClaimTrack.MULTI_CLAIM });
  }

  protected async buildData({
    claimTrack = ClaimTrack.SMALL_CLAIM,
    claimantPartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    defendantPartyType = claimantDefendantPartyTypes.INDIVIDUAL,
  }: {
    claimTrack?: ClaimTrack;
    claimantPartyType?: ClaimantDefendantPartyType;
    defendantPartyType?: ClaimantDefendantPartyType;
  } = {}) {
    this.setClaimantDefendantPartyTypes(ClaimType.LIP_VS_LIP, {
      claimant1PartyType: claimantPartyType,
      defendant1PartyType: defendantPartyType,
    });

    const { civilServiceRequests } = this.requestsFactory;
    const claimValue = CaseDataHelper.getClaimValue(claimTrack);
    const claimFee = await civilServiceRequests.getClaimFeeData(
      this.claimantCitizenUser,
      claimValue,
    );

    return {
      ...createClaimData.claimant1(claimantPartyType, this.claimantCitizenUser),
      ...createClaimData.defendant1(defendantPartyType, this.defendantCitizenUser),
      ...createClaimData.claimAmount(claimTrack),
      ...createClaimData.claimDetails,
      ...createClaimData.claimInterest,
      ...createClaimData.claimantUserDetails(this.claimantCitizenUser),
      ...createClaimData.helpWithFees,
      ...createClaimData.pcq,
      ...createClaimData.claimant1AdditionalLipPartyDetails(claimantPartyType),
      ...createClaimData.timelineOfEvents,
      ...createClaimData.flightDelay,
      ...createClaimData.claimFee(claimFee),
    };
  }
}
