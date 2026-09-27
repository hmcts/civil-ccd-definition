import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CreateClaimParams from '../../../../../models/ccd-events/ccd-events/create-claim/create-claim-params';
import createClaimData from './create-claim-data-components';

@AllMethodsStep()
export default class CreateClaimDataBuilder extends BaseDataBuilder {
  async buildData({
    claimType,
    claimTypeUnspec,
    personalInjuryType,
    claimTrack,
    claimant1PartyType,
    claimant2PartyType,
    defendant1PartyType,
    defendant2PartyType,
  }: Required<CreateClaimParams>) {
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
