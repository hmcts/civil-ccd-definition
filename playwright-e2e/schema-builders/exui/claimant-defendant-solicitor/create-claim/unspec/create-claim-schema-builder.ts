import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import claimantDefendantPartyTypes from '../../../../../constants/users/claimant-defendant-party-types';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimTypeUnspec from '../../../../../constants/ccd-events/ccd-events/create-claim/claim-type-unspec';
import PersonalInjuryType from '../../../../../constants/ccd-events/ccd-events/create-claim/personal-injury-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import CreateClaimParams from '../../../../../models/api/create-claim-params';
import createClaimResponseSchema from './create-claim-schema-components';

@AllMethodsStep()
export default class CreateClaimSchemaBuilder extends BaseSchemaBuilder {
  async buildSchema({
    claimType = ClaimType.ONE_VS_ONE,
    claimTypeUnspec = ClaimTypeUnspec.PERSONAL_INJURY,
    personalInjuryType = PersonalInjuryType.ROAD_ACCIDENT,
    claimTrack = ClaimTrack.SMALL_CLAIM,
    claimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    claimant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    defendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    defendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
  }: CreateClaimParams = {}): Promise<z.ZodType> {
    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      createClaimResponseSchema.references,
      createClaimResponseSchema.claimantCourt,
      createClaimResponseSchema.claimant1(claimant1PartyType),
      createClaimResponseSchema.claimantSolicitor1,
      createClaimResponseSchema.defendant1(defendant1PartyType),
      createClaimResponseSchema.statementOfTruth,
      createClaimResponseSchema.solicitorReferences(claimType),
      createClaimResponseSchema.details(claimTrack),
      createClaimResponseSchema.otherRemedy(claimTypeUnspec),
      createClaimResponseSchema.uploadParticularsOfClaim,
      createClaimResponseSchema.claimValue,
      createClaimResponseSchema.pbaNumber,
      createClaimResponseSchema.claimant2(claimType, claimant2PartyType),
      createClaimResponseSchema.defendantSolicitor1(claimType),
      createClaimResponseSchema.defendant2(claimType, defendant2PartyType),
      createClaimResponseSchema.defendant2Representation(claimType),
      createClaimResponseSchema.lipResponseArtifacts(claimType),
      createClaimResponseSchema.claimTypeUnspec(claimTypeUnspec, personalInjuryType),
    );

    return z.looseObject(schemaShape);
  }
}
