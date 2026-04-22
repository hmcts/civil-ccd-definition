import BaseDataBuilder from '../../../../../base/base-data-builder';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import claimantDefendantPartyTypes from '../../../../../constants/claimant-defendant-party-types';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimTypeUnspec from '../../../../../enums/ccd-events/create-claim/claim-type-unspec';
import PersonalInjuryType from '../../../../../enums/ccd-events/create-claim/personal-injury-type';
import ClaimTrack from '../../../../../enums/claim-track';
import ClaimType from '../../../../../enums/claim-type';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';
import { UploadDocumentValue } from '../../../../../models/ccd/ccd-case-data';
import { ClaimantDefendantPartyType } from '../../../../../models/claimant-defendant-party-types';
import ClaimTypeUnspecObjs from '../../../../../models/unspec/claim-type-unspec-objs';
import createClaimData from './create-claim-data-components';
@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class CreateClaimDataBuilder extends BaseDataBuilder {
  async buildFastTrack1v1() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildSmallTrack1v1() {
    return this.buildData();
  }

  async buildSmallTrack2v1() {
    return this.buildData({ claimType: ClaimType.TWO_VS_ONE });
  }

  async buildSmallTrack1v2SS() {
    return this.buildData({ claimType: ClaimType.ONE_VS_TWO_SAME_SOL });
  }

  async buildSmallTrack1v2DS() {
    return this.buildData({ claimType: ClaimType.ONE_VS_TWO_DIFF_SOL });
  }

  async buildSmallTrack1vLIP() {
    return this.buildData({ claimType: ClaimType.ONE_VS_ONE_LIP });
  }

  async buildSmallTrack1v2LIPs() {
    return this.buildData({ claimType: ClaimType.ONE_VS_TWO_LIPS });
  }

  async buildSmallTrack1v2LIPLR() {
    return this.buildData({ claimType: ClaimType.ONE_VS_TWO_LIP_LR });
  }

  async buildSmallTrack1v2LRLIP() {
    return this.buildData({ claimType: ClaimType.ONE_VS_TWO_LR_LIP });
  }

  protected async buildData({
    claimType = ClaimType.ONE_VS_ONE,
    claimTypeUnspec = {claimTypeUnspec: ClaimTypeUnspec.PERSONAL_INJURY, personalInjuryType: PersonalInjuryType.ROAD_ACCIDENT},
    claimTrack = ClaimTrack.SMALL_CLAIM,
    claimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    claimant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    defendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    defendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
  }: {
    claimType?: ClaimType;
    claimTypeUnspec?: ClaimTypeUnspecObjs | ClaimTypeUnspec;
    claimTrack?: ClaimTrack;
    claimant1PartyType?: ClaimantDefendantPartyType;
    claimant2PartyType?: ClaimantDefendantPartyType;
    defendant1PartyType?: ClaimantDefendantPartyType;
    defendant2PartyType?: ClaimantDefendantPartyType;
  } = {}) {
    const { civilServiceRequests } = this.requestsFactory; 

    const particularsOfClaimDocument = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const certificateOfSuitability = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    let certificateOfSuitability2: UploadDocumentValue;
    if(ClaimTypeHelper.isClaimant2(claimType)) {
      certificateOfSuitability2 = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    }

    return {
      ...createClaimData.references,
      ...createClaimData.claimantCourt,
      ...createClaimData.claimant1(claimant1PartyType, certificateOfSuitability),
      ...createClaimData.claimantSolicitor1,
      ...createClaimData.claimant2(claimType, claimant2PartyType, certificateOfSuitability2),
      ...createClaimData.defendant1(defendant1PartyType),
      ...createClaimData.defendantSolicitor1(claimType),
      ...createClaimData.defendant2(claimType, defendant2PartyType),
      ...createClaimData.defendant2Represented(claimType),
      ...createClaimData.defendant2SameSolicitor(claimType),
      ...createClaimData.defendantSolicitor2(claimType),
      ...createClaimData.claimTypeUnspec(claimTypeUnspec),
      ...createClaimData.claimDetails(claimTrack, particularsOfClaimDocument),
      ...createClaimData.statementOfTruth,
    };
  }
}
