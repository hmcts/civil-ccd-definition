import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import claimantDefendantPartyTypes from '../../../../../constants/users/claimant-defendant-party-types';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimType from '../../../../../constants/cases/claim-type';
import CreateClaimSpecParams from '../../../../../models/api/create-claim-spec-params';
import createClaimSpecSchemaComponents from './create-claim-spec-schema-components';
import FlightDelayClaim from '../../../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/flight-delay-claim';
import Airline from '../../../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/airline';

@AllMethodsStep()
export default class CreateClaimSpecSchemaBuilder extends BaseSchemaBuilder {
  async buildSchema({
    claimType = ClaimType.ONE_VS_ONE,
    claimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    claimant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    defendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    defendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    flightDelayClaim = FlightDelayClaim.NO,
    airline = Airline.BA,
  }: CreateClaimSpecParams = {}): Promise<z.ZodType> {
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
