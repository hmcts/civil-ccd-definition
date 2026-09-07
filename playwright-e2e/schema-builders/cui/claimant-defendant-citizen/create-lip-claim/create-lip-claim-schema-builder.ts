import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import ClaimTrack from '../../../../constants/cases/claim-track';
import claimantDefendantPartyTypes from '../../../../constants/users/claimant-defendant-party-types';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { ClaimantDefendantPartyType } from '../../../../models/users/claimant-defendant-party-types';
import createClaimSchemaComponents from './create-lip-claim-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class CreateLipClaimSchemaBuilder extends BaseSchemaBuilder {
  async buildSmall(): Promise<z.ZodType> {
    return this.buildSchema({ claimTrack: ClaimTrack.SMALL_CLAIM });
  }

  async buildFast(): Promise<z.ZodType> {
    return this.buildSchema({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildInter(): Promise<z.ZodType> {
    return this.buildSchema({ claimTrack: ClaimTrack.INTERMEDIATE_CLAIM });
  }

  async buildMulti(): Promise<z.ZodType> {
    return this.buildSchema({ claimTrack: ClaimTrack.MULTI_CLAIM });
  }

  protected async buildSchema({
    claimTrack = ClaimTrack.SMALL_CLAIM,
    claimantPartyType = claimantDefendantPartyTypes.INDIVIDUAL,
    defendantPartyType = claimantDefendantPartyTypes.INDIVIDUAL,
  }: {
    claimTrack?: ClaimTrack;
    claimantPartyType?: ClaimantDefendantPartyType;
    defendantPartyType?: ClaimantDefendantPartyType;
  } = {}): Promise<z.ZodType> {
    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      createClaimSchemaComponents.claimant1(claimantPartyType),
      createClaimSchemaComponents.defendant1(defendantPartyType),
      createClaimSchemaComponents.claimAmount(claimTrack),
      createClaimSchemaComponents.claimDetails,
      createClaimSchemaComponents.claimInterest,
      createClaimSchemaComponents.claimantUserDetails,
      createClaimSchemaComponents.helpWithFees,
      createClaimSchemaComponents.pcq,
      createClaimSchemaComponents.timelineOfEvents,
      createClaimSchemaComponents.flightDelay,
      createClaimSchemaComponents.claimFee,
    );

    return z.looseObject(schemaShape);
  }
}
