import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import createClaimSpecData from './create-claim-spec-data-components';
import BaseDataBuilder from '../../../../../../base/base-data-builder';
import ClaimType from '../../../../../../enums/claim-type';
import ClaimTrack from '../../../../../../enums/claim-track';
import claimantDefendantTypes from '../../../../../../constants/party-types';
import { ClaimantDefendantType } from '../../../../../../models/claimant-defendant-types';

@AllMethodsStep()
export default class CreateClaimSpecDataBuilder extends BaseDataBuilder {
  async buildSmallTrack1v1() {
    return this.buildData();
  }
  protected async buildData({
    claimType = ClaimType.ONE_VS_ONE,
    claimTrack = ClaimTrack.SMALL_CLAIM,
    claimant1PartyType = claimantDefendantTypes.INDIVIDUAL,
    claimant2PartyType = claimantDefendantTypes.INDIVIDUAL,
    defendant1PartyType = claimantDefendantTypes.INDIVIDUAL,
    defendant2PartyType = claimantDefendantTypes.INDIVIDUAL,
  }: {
    claimType?: ClaimType;
    claimTrack?: ClaimTrack;
    claimant1PartyType?: ClaimantDefendantType;
    claimant2PartyType?: ClaimantDefendantType;
    defendant1PartyType?: ClaimantDefendantType;
    defendant2PartyType?: ClaimantDefendantType;
  } = {}) {
    return {
      ...createClaimSpecData.references,
      ...createClaimSpecData.claimant1(claimant1PartyType),
      ...createClaimSpecData.claimantSolicitor1,
      ...createClaimSpecData.claimant2(claimType, claimant2PartyType),
      ...createClaimSpecData.defendant1(defendant1PartyType),
      ...createClaimSpecData.defendantSolicitor1(claimType),
      ...createClaimSpecData.defendant2(claimType, defendant2PartyType),
      ...createClaimSpecData.defendant2Represented(claimType),
      ...createClaimSpecData.defendant2SameSolicitor(claimType),
      ...createClaimSpecData.defendantSolicitor2(claimType),
      ...createClaimSpecData.claimDetails(claimTrack),
      ...createClaimSpecData.statementOfTruth,
    };
  }
}
