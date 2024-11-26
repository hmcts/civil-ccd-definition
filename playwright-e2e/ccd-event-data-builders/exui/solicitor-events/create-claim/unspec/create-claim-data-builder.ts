import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../enums/claim-track';
import ClaimType from '../../../../../enums/claim-type';
import PartyType from '../../../../../enums/party-type';
import createClaimData from './create-claim-data-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class CreateClaimDataBuilder {
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
      ...createClaimData.references,
      ...createClaimData.claimantCourt,
      ...createClaimData.claimDetails(claimTrack),
      ...createClaimData.statementOfTruth,
    };
    switch (claimType) {
      case ClaimType.ONE_VS_ONE_LIP:
        return {
          ...baseClaimData,
          ...createClaimData.claimant1(claimant1PartyType),
          ...createClaimData.claimant1LitigationFriend,
          ...createClaimData.claimantSolicitor1,
          ...createClaimData.claimantSolicitor1ServiceAddress,
          ...createClaimData.defendant1(defendant1PartyType),
        };
      case ClaimType.ONE_VS_TWO_LIPS:
        return {
          ...baseClaimData,
          ...createClaimData.claimant1(claimant1PartyType),
          ...createClaimData.claimant1LitigationFriend,
          ...createClaimData.claimantSolicitor1,
          ...createClaimData.claimantSolicitor1ServiceAddress,
          ...createClaimData.defendant1(defendant1PartyType),
          ...createClaimData.defendant2(defendant2PartyType),
        };
      case ClaimType.ONE_VS_TWO_ONE_LR_ONE_LIP:
        return {
          ...baseClaimData,
          ...createClaimData.claimant1(claimant1PartyType),
          ...createClaimData.claimant1LitigationFriend,
          ...createClaimData.claimantSolicitor1,
          ...createClaimData.claimantSolicitor1ServiceAddress,
          ...createClaimData.defendant1(defendant1PartyType),
          ...createClaimData.defendantSolicitor1,
          ...createClaimData.defendantSolicitor1ServiceAddress,
          ...createClaimData.defendant2(defendant2PartyType),
        };
      case ClaimType.ONE_VS_TWO_ONE_LIP_ONE_LR:
        return {
          ...baseClaimData,
          ...createClaimData.claimant1(claimant1PartyType),
          ...createClaimData.claimant1LitigationFriend,
          ...createClaimData.claimantSolicitor1,
          ...createClaimData.claimantSolicitor1ServiceAddress,
          ...createClaimData.defendant1(defendant1PartyType),
          ...createClaimData.defendant2(defendant2PartyType),
          ...createClaimData.defendantSolicitor2,
          ...createClaimData.defendantSolicitor2ServiceAddress,
        };
      case ClaimType.TWO_VS_ONE_LIP:
        return {
          ...baseClaimData,
          ...createClaimData.claimant1(claimant1PartyType),
          ...createClaimData.claimant1LitigationFriend,
          ...createClaimData.claimantSolicitor1,
          ...createClaimData.claimantSolicitor1ServiceAddress,
          ...createClaimData.claimant2(claimant2PartyType),
          ...createClaimData.claimant2LitigationFriend,
          ...createClaimData.defendant1(defendant1PartyType),
        };
      case ClaimType.ONE_VS_ONE:
        return {
          ...baseClaimData,
          ...createClaimData.claimant1(claimant1PartyType),
          ...createClaimData.claimant1LitigationFriend,
          ...createClaimData.claimantSolicitor1,
          ...createClaimData.claimantSolicitor1ServiceAddress,
          ...createClaimData.defendant1(defendant1PartyType),
          ...createClaimData.defendantSolicitor1,
          ...createClaimData.defendantSolicitor1ServiceAddress,
        };
      case ClaimType.TWO_VS_ONE:
        return {
          ...baseClaimData,
          ...createClaimData.claimant1(claimant1PartyType),
          ...createClaimData.claimant1LitigationFriend,
          ...createClaimData.claimantSolicitor1,
          ...createClaimData.claimantSolicitor1ServiceAddress,
          ...createClaimData.claimant2(claimant2PartyType),
          ...createClaimData.claimant2LitigationFriend,
          ...createClaimData.defendant1(defendant1PartyType),
          ...createClaimData.defendantSolicitor1,
          ...createClaimData.defendantSolicitor1ServiceAddress,
        };
      case ClaimType.ONE_VS_TWO_SAME_SOL:
        return {
          ...baseClaimData,
          ...createClaimData.claimant1(claimant1PartyType),
          ...createClaimData.claimant1LitigationFriend,
          ...createClaimData.claimantSolicitor1,
          ...createClaimData.claimantSolicitor1ServiceAddress,
          ...createClaimData.defendant1(defendant1PartyType),
          ...createClaimData.defendantSolicitor1,
          ...createClaimData.defendantSolicitor1ServiceAddress,
          ...createClaimData.defendant2(defendant1PartyType),
          ...createClaimData.sameSolicitor,
        };
      case ClaimType.ONE_VS_TWO_DIFF_SOL:
        return {
          ...baseClaimData,
          ...createClaimData.claimant1(claimant1PartyType),
          ...createClaimData.claimant1LitigationFriend,
          ...createClaimData.claimantSolicitor1,
          ...createClaimData.claimantSolicitor1ServiceAddress,
          ...createClaimData.defendant1(defendant1PartyType),
          ...createClaimData.defendantSolicitor1,
          ...createClaimData.defendantSolicitor1ServiceAddress,
          ...createClaimData.defendant2(defendant1PartyType),
          ...createClaimData.defendantSolicitor2,
          ...createClaimData.defendantSolicitor2ServiceAddress,
        };
    }
  }
}
