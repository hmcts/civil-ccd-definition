import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import createClaimSpecData from './create-claim-spec-data-components';
import BaseDataBuilder from '../../../../../../base/base-data-builder';
import ClaimType from '../../../../../../enums/claim-type';
import ClaimTrack from '../../../../../../enums/claim-track';
import partyTypes from '../../../../../../constants/party-types';
import { PartyType } from '../../../../../../models/party-types';

@AllMethodsStep()
export default class CreateClaimSpecDataBuilder extends BaseDataBuilder {
  async buildSmallTrack1v1() {
    return this.buildData();
  }
  protected async buildData({
    claimType = ClaimType.ONE_VS_ONE,
    claimTrack = ClaimTrack.SMALL_CLAIM,
    claimant1PartyType = partyTypes.INDIVIDUAL,
    claimant2PartyType = partyTypes.INDIVIDUAL,
    defendant1PartyType = partyTypes.INDIVIDUAL,
    defendant2PartyType = partyTypes.INDIVIDUAL,
  }: {
    claimType?: ClaimType;
    claimTrack?: ClaimTrack;
    claimant1PartyType?: PartyType;
    claimant2PartyType?: PartyType;
    defendant1PartyType?: PartyType;
    defendant2PartyType?: PartyType;
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
