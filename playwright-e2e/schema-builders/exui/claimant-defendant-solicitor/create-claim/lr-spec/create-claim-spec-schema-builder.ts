import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CreateClaimSpecOptions from '../../../../../models/ccd-events/ccd-events/create-claim-spec/create-claim-spec-options';
import createClaimSpecSchemaComponents from './create-claim-spec-schema-components';

@AllMethodsStep()
export default class CreateClaimSpecSchemaBuilder extends BaseSchemaBuilder {
  async buildSchema({
    claimType,
    claimant1PartyType,
    claimant2PartyType,
    defendant1PartyType,
    defendant2PartyType,
    flightDelayClaim,
    airline,
  }: Required<CreateClaimSpecOptions>): Promise<z.ZodType> {
    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      createClaimSpecSchemaComponents.references,
      createClaimSpecSchemaComponents.claimantCourt,
      createClaimSpecSchemaComponents.claimant1(claimant1PartyType),
      createClaimSpecSchemaComponents.claimantSolicitor1,
      createClaimSpecSchemaComponents.defendant1(defendant1PartyType),
      createClaimSpecSchemaComponents.statementOfTruth,
      createClaimSpecSchemaComponents.solicitorReferences(claimType),
      createClaimSpecSchemaComponents.claimDetails(flightDelayClaim, airline),
      createClaimSpecSchemaComponents.claimant2(claimType, claimant2PartyType),
      createClaimSpecSchemaComponents.defendantSolicitor1(claimType),
      createClaimSpecSchemaComponents.defendant2(claimType, defendant2PartyType),
      createClaimSpecSchemaComponents.defendant2Representation(claimType),
    );

    return z.looseObject(schemaShape);
  }
}
