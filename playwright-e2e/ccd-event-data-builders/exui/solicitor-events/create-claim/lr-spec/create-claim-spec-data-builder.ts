import { AllMethodsStep } from '../../../../../decorators/test-steps';
import createClaimSpecData from './create-claim-spec-data-components';
import ClaimTrack from '../../../../../enums/claim-track';
import ClaimType from '../../../../../enums/claim-type';
import PartyType from '../../../../../enums/party-type';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class CreateClaimSpecDataBuilder {
  buildData({
    claimType,
    claimTrack,
    claimant1PartyType,
    claimant2PartyType,
    defendant1PartyType,
    defendant2PartyType,
  }: {
    claimType: ClaimType;
    claimTrack: ClaimTrack;
    claimant1PartyType: PartyType;
    claimant2PartyType: PartyType;
    defendant1PartyType: PartyType;
    defendant2PartyType: PartyType;
  }) {
    const baseClaimData = {
      ...createClaimSpecData.references,
      ...createClaimSpecData.claimDetails(claimTrack),
      ...createClaimSpecData.statementOfTruth,
    };
    switch (claimType) {
      case ClaimType.ONE_VS_ONE_LIP:
        return {
          ...baseClaimData,
          ...createClaimSpecData.claimant1(claimant1PartyType),
          ...createClaimSpecData.claimantSolicitor1,
          ...createClaimSpecData.claimantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.defendant1(defendant1PartyType),
        };
      case ClaimType.ONE_VS_TWO_LIPS:
        return {
          ...baseClaimData,
          ...createClaimSpecData.claimant1(claimant1PartyType),
          ...createClaimSpecData.claimantSolicitor1,
          ...createClaimSpecData.claimantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.defendant1(defendant1PartyType),
          ...createClaimSpecData.defendant2(defendant2PartyType),
        };
      case ClaimType.ONE_VS_TWO_ONE_LR_ONE_LIP:
        return {
          ...baseClaimData,
          ...createClaimSpecData.claimant1(claimant1PartyType),
          ...createClaimSpecData.claimantSolicitor1,
          ...createClaimSpecData.claimantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.defendant1(defendant1PartyType),
          ...createClaimSpecData.defendantSolicitor1,
          ...createClaimSpecData.defendantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.defendant2(defendant2PartyType),
        };
      case ClaimType.ONE_VS_TWO_ONE_LIP_ONE_LR:
        return {
          ...baseClaimData,
          ...createClaimSpecData.claimant1(claimant1PartyType),
          ...createClaimSpecData.claimantSolicitor1,
          ...createClaimSpecData.claimantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.defendant1(defendant1PartyType),
          ...createClaimSpecData.defendant2(defendant2PartyType),
          ...createClaimSpecData.defendantSolicitor2,
          ...createClaimSpecData.defendantSolicitor2CorrespondenceAddress,
        };
      case ClaimType.TWO_VS_ONE_LIP:
        return {
          ...baseClaimData,
          ...createClaimSpecData.claimant1(claimant1PartyType),
          ...createClaimSpecData.claimantSolicitor1,
          ...createClaimSpecData.claimantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.claimant2(claimant2PartyType),
          ...createClaimSpecData.defendant1(defendant1PartyType),
        };
      case ClaimType.ONE_VS_ONE:
        return {
          ...baseClaimData,
          ...createClaimSpecData.claimant1(claimant1PartyType),
          ...createClaimSpecData.claimantSolicitor1,
          ...createClaimSpecData.claimantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.defendant1(defendant1PartyType),
          ...createClaimSpecData.defendantSolicitor1,
          ...createClaimSpecData.defendantSolicitor1CorrespondenceAddress,
        };
      case ClaimType.TWO_VS_ONE:
        return {
          ...baseClaimData,
          ...createClaimSpecData.claimant1(claimant1PartyType),
          ...createClaimSpecData.claimantSolicitor1,
          ...createClaimSpecData.claimantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.claimant2(claimant2PartyType),
          ...createClaimSpecData.defendant1(defendant1PartyType),
          ...createClaimSpecData.defendantSolicitor1,
          ...createClaimSpecData.defendantSolicitor1CorrespondenceAddress,
        };
      case ClaimType.ONE_VS_TWO_SAME_SOL:
        return {
          ...baseClaimData,
          ...createClaimSpecData.claimant1(claimant1PartyType),
          ...createClaimSpecData.claimantSolicitor1,
          ...createClaimSpecData.claimantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.defendant1(defendant1PartyType),
          ...createClaimSpecData.defendantSolicitor1,
          ...createClaimSpecData.defendantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.defendant2(defendant1PartyType),
          ...createClaimSpecData.sameSolicitor,
        };
      case ClaimType.ONE_VS_TWO_DIFF_SOL:
        return {
          ...baseClaimData,
          ...createClaimSpecData.claimant1(claimant1PartyType),
          ...createClaimSpecData.claimantSolicitor1,
          ...createClaimSpecData.claimantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.defendant1(defendant1PartyType),
          ...createClaimSpecData.defendantSolicitor1,
          ...createClaimSpecData.defendantSolicitor1CorrespondenceAddress,
          ...createClaimSpecData.defendant2(defendant1PartyType),
          ...createClaimSpecData.defendantSolicitor2,
          ...createClaimSpecData.defendantSolicitor2CorrespondenceAddress,
        };
    }
  }
}
