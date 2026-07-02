import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import claimantResponseSchemaComponents from './claimant-response-schema-components';
import ClaimType from '../../../../../constants/cases/claim-type';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class ClaimantResponseSchemaBuilder extends BaseSchemaBuilder {
  async buildSmallFullDefence1v1Data(
    caseDataBeforeSubmission?: CCDCaseData,
  ): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  async buildFastFullDefence2v1Data(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastProceed1v2SSData(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastFullDefence1v1Data(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, { claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildFastFullDefence1v2DSData(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, { claimType: ClaimType.ONE_VS_TWO_DIFF_SOL, claimTrack: ClaimTrack.FAST_CLAIM });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    { 
      claimType = ClaimType.ONE_VS_ONE, 
      claimTrack = ClaimTrack.SMALL_CLAIM 
    } : 
    { 
      claimType?: ClaimType, 
      claimTrack?: ClaimTrack 
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      claimantResponseSchemaComponents.respondentResponse(claimType),
      claimantResponseSchemaComponents.applicantDefenceResponseDocument(claimType),
      claimantResponseSchemaComponents.deterWithoutHearing(claimTrack),
      claimantResponseSchemaComponents.fastTrackDq(claimTrack),
      claimantResponseSchemaComponents.experts,
      claimantResponseSchemaComponents.witnesses,
      claimantResponseSchemaComponents.language,
      claimantResponseSchemaComponents.hearing,
      claimantResponseSchemaComponents.draftDirections,
      claimantResponseSchemaComponents.hearingSupport,
      claimantResponseSchemaComponents.vulnerabilityQuestions,
      claimantResponseSchemaComponents.furtherInformation,
      claimantResponseSchemaComponents.undefine,
    );

    return baseSchema.extend(schemaShape);
  }
}
