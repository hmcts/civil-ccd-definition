import BaseDataBuilder from '../../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../../enums/claim-track';
import ClaimType from '../../../../../../enums/claim-type';
import PartyType from '../../../../../../enums/party-type';
import { UploadDocumentValue } from '../../../../../../models/ccd/ccd-case-data';
import createClaimData from './create-claim-data-components';

@AllMethodsStep()
export default class CreateClaimDataBuilder extends BaseDataBuilder {
  async buildSmallTrack1v1(particularsOfClaimDocument: UploadDocumentValue) {
    return this.buildData(particularsOfClaimDocument);
  }

  protected async buildData(
    particularsOfClaimDocument: UploadDocumentValue,
    {
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
    } = {},
  ) {
    return {
      ...createClaimData.references,
      ...createClaimData.claimantCourt,
      ...createClaimData.claimant1(claimant1PartyType),
      ...createClaimData.claimantSolicitor1,
      ...createClaimData.claimant2(claimType, claimant2PartyType),
      ...createClaimData.defendant1(defendant1PartyType),
      ...createClaimData.defendantSolicitor1(claimType),
      ...createClaimData.defendant2(claimType, defendant2PartyType),
      ...createClaimData.defendant2Represented(claimType),
      ...createClaimData.defendant2SameSolicitor(claimType),
      ...createClaimData.defendantSolicitor2(claimType),
      ...createClaimData.claimDetails(claimTrack, particularsOfClaimDocument),
      ...createClaimData.statementOfTruth,
    };
  }
}
