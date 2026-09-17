import BaseDataBuilder from '../../../../../base/base-data-builder';
import claimantDefendantPartyTypes from '../../../../../constants/users/claimant-defendant-party-types';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimTypeUnspec from '../../../../../constants/ccd-events/ccd-events/create-claim/claim-type-unspec';
import PersonalInjuryType from '../../../../../constants/ccd-events/ccd-events/create-claim/personal-injury-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import CreateClaimParams from '../../../../../models/api/create-claim-params';
import createClaimData from './create-claim-data-components';

@AllMethodsStep()
export default class CreateClaimDataBuilder extends BaseDataBuilder {
  async buildData({
    claimType = ClaimType.ONE_VS_ONE,
    claimTypeUnspec = ClaimTypeUnspec.PERSONAL_INJURY,
    personalInjuryType = PersonalInjuryType.ROAD_ACCIDENT,
    claimTrack = ClaimTrack.SMALL_CLAIM,
    claimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    claimant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    defendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    defendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
  }: CreateClaimParams = {}) {
    const { civilServiceRequests } = this.requestsFactory;
    this.setClaimantDefendantPartyTypes(claimType, {
      claimant1PartyType,
      claimant2PartyType,
      defendant1PartyType,
      defendant2PartyType,
    });

    return {
      ...createClaimData.references,
      ...createClaimData.claimantCourt,
      ...(await createClaimData.claimant1(claimant1PartyType, civilServiceRequests)),
      ...createClaimData.claimantSolicitor1,
      ...(await createClaimData.claimant2(claimType, claimant2PartyType, civilServiceRequests)),
      ...createClaimData.defendant1(defendant1PartyType),
      ...createClaimData.defendantSolicitor1(claimType),
      ...createClaimData.defendant2(claimType, defendant2PartyType),
      ...createClaimData.defendant2Represented(claimType),
      ...createClaimData.defendant2SameSolicitor(claimType),
      ...createClaimData.defendantSolicitor2(claimType),
      ...createClaimData.claimTypeUnspec(claimTypeUnspec, personalInjuryType),
      ...createClaimData.otherRemedy(claimTypeUnspec),
      ...createClaimData.details,
      ...createClaimData.uploadParticularsOfClaim,
      ...createClaimData.claimValue(claimTrack),
      ...createClaimData.pbaNumber,
      ...createClaimData.statementOfTruth,
    };
  }
}
