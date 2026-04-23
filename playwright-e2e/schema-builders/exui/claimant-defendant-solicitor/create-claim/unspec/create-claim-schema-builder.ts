import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import claimantDefendantPartyTypes from '../../../../../constants/claimant-defendant-party-types';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimTypeUnspec from '../../../../../enums/ccd-events/create-claim/claim-type-unspec';
import PersonalInjuryType from '../../../../../enums/ccd-events/create-claim/personal-injury-type';
import ClaimTrack from '../../../../../enums/claim-track';
import ClaimType from '../../../../../enums/claim-type';
import { ClaimantDefendantPartyType } from '../../../../../models/claimant-defendant-party-types';
import ClaimTypeUnspecObjs from '../../../../../models/unspec/claim-type-unspec-objs';
import createClaimResponseSchema from './create-claim-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class CreateClaimSchemaBuilder extends BaseSchemaBuilder {
  async buildFastTrack1v1(): Promise<z.ZodType> {
    return this.buildSchema({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildSmallTrack1v1(): Promise<z.ZodType> {
    return this.buildSchema();
  }

  async buildSmallTrack2v1(): Promise<z.ZodType> {
    return this.buildSchema({ claimType: ClaimType.TWO_VS_ONE });
  }

  async buildSmallTrack1v2SS(): Promise<z.ZodType> {
    return this.buildSchema({ claimType: ClaimType.ONE_VS_TWO_SAME_SOL });
  }

  async buildSmallTrack1v2DS(): Promise<z.ZodType> {
    return this.buildSchema({ claimType: ClaimType.ONE_VS_TWO_DIFF_SOL });
  }

  async buildSmallTrack1vLIP(): Promise<z.ZodType> {
    return this.buildSchema({ claimType: ClaimType.ONE_VS_ONE_LIP });
  }

  async buildSmallTrack1v2LIPs(): Promise<z.ZodType> {
    return this.buildSchema({ claimType: ClaimType.ONE_VS_TWO_LIPS });
  }

  async buildSmallTrack1v2LIPLR(): Promise<z.ZodType> {
    return this.buildSchema({ claimType: ClaimType.ONE_VS_TWO_LIP_LR });
  }

  async buildSmallTrack1v2LRLIP(): Promise<z.ZodType> {
    return this.buildSchema({ claimType: ClaimType.ONE_VS_TWO_LR_LIP });
  }

  protected async buildSchema({
    claimType = ClaimType.ONE_VS_ONE,
    claimTypeUnspec = {
      claimTypeUnspec: ClaimTypeUnspec.PERSONAL_INJURY,
      personalInjuryType: PersonalInjuryType.ROAD_ACCIDENT,
    },
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
  } = {}): Promise<z.ZodType> {
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
      createClaimResponseSchema.claimDetails(claimTrack),
      createClaimResponseSchema.claimant2(claimType, claimant2PartyType),
      createClaimResponseSchema.defendantSolicitor1(claimType),
      createClaimResponseSchema.defendant2(claimType, defendant2PartyType),
      createClaimResponseSchema.defendant2Representation(claimType),
      createClaimResponseSchema.lipResponseArtifacts(claimType),
      createClaimResponseSchema.claimTypeUnspec(claimTypeUnspec),
    );

    return z.looseObject(schemaShape);
  }
}
