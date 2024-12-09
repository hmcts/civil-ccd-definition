import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import createClaimSpecData from './create-claim-spec-data-components';
import ClaimTrack from '../../../../../../enums/claim-track';
import ClaimType from '../../../../../../enums/claim-type';
import PartyType from '../../../../../../enums/party-type';
import BaseDataBuilder from '../../../../../../base/base-data-builder';

@AllMethodsStep()
export default class CreateClaimSpecDataBuilder extends BaseDataBuilder {
  async buildSmallTrack1v1() {
    return this.buildData();
  }
  protected async buildData({
    claimType = ClaimType.ONE_VS_ONE,
    claimTrack = ClaimTrack.SMALL_CLAIM,
    claimant1PartyType = PartyType.INDIVIDUAL,
    claimant2PartyType = PartyType.INDIVIDUAL,
    defendant1PartyType = PartyType.INDIVIDUAL,
    defendant2PartyType = PartyType.INDIVIDUAL,
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
