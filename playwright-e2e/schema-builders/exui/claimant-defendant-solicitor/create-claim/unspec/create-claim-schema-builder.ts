import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CreateClaimParams from '../../../../../models/ccd-events/ccd-events/create-claim/create-claim-params';
import createClaimResponseSchema from './create-claim-schema-components';

@AllMethodsStep()
export default class CreateClaimSchemaBuilder extends BaseSchemaBuilder {
  async buildSchema({
    claimType,
    claimTypeUnspec,
    personalInjuryType,
    claimTrack,
    claimant1PartyType,
    claimant2PartyType,
    defendant1PartyType,
    defendant2PartyType,
  }: Required<CreateClaimParams>): Promise<z.ZodType> {
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
