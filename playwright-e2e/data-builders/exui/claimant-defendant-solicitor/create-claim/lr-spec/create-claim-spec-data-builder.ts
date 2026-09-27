import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CreateClaimSpecParams from '../../../../../models/ccd-events/ccd-events/create-claim-spec/create-claim-spec-params';
import createClaimSpecData from './create-claim-spec-data-components';

@AllMethodsStep()
export default class CreateClaimSpecDataBuilder extends BaseDataBuilder {
  async buildData({
    claimType,
    claimTrack,
    claimant1PartyType,
    claimant2PartyType,
    defendant1PartyType,
    defendant2PartyType,
    flightDelayClaim,
    airline,
  }: Required<CreateClaimSpecParams>) {
    this.setClaimantDefendantPartyTypes(claimType, {
      claimant1PartyType,
      claimant2PartyType,
      defendant1PartyType,
      defendant2PartyType,
    });

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
      ...createClaimSpecData.flightDelayClaim(flightDelayClaim, airline),
      ...createClaimSpecData.claimDetails(claimTrack),
      ...createClaimSpecData.statementOfTruth,
    };
  }
}
