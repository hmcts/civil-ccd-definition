import BaseDataBuilder from '../../../../../../base/base-data-builder';
import claimantDefendantPartyTypes from '../../../../../../constants/claimant-defendant-party-types';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../../enums/claim-track';
import ClaimType from '../../../../../../enums/claim-type';
import { UploadDocumentValue } from '../../../../../../models/ccd/ccd-case-data';
import { ClaimantDefendantPartyType } from '../../../../../../models/claimant-defendant-party-types';
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
      claimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
      claimant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
      defendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
      defendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    }: {
      claimType?: ClaimType;
      claimTrack?: ClaimTrack;
      claimant1PartyType?: ClaimantDefendantPartyType;
      claimant2PartyType?: ClaimantDefendantPartyType;
      defendant1PartyType?: ClaimantDefendantPartyType;
      defendant2PartyType?: ClaimantDefendantPartyType;
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
