import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import claimantResponseSchemaComponents from './claimant-response-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class ClaimantResponseSchemaBuilder extends BaseSchemaBuilder {
  async buildFastTrack1v1FullDefence(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, { claimTrack: ClaimTrack.FAST_CLAIM });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    { claimTrack = ClaimTrack.SMALL_CLAIM }: { claimTrack?: ClaimTrack } = {},
  ): Promise<z.ZodType> {
    let baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    baseSchema = baseSchema.omit({
      nextDeadline: true,
      applicantSolicitor1ClaimStatementOfTruth: true,
    });

    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      claimantResponseSchemaComponents.respondentResponse,
      claimantResponseSchemaComponents.applicantDefenceResponseDocument,
      claimantResponseSchemaComponents.fastTrackDq(claimTrack),
      claimantResponseSchemaComponents.experts,
      claimantResponseSchemaComponents.witnesses,
      claimantResponseSchemaComponents.language,
      claimantResponseSchemaComponents.hearing,
      claimantResponseSchemaComponents.draftDirections,
      claimantResponseSchemaComponents.hearingSupport,
      claimantResponseSchemaComponents.vulnerabilityQuestions,
      claimantResponseSchemaComponents.furtherInformation,
    );

    return baseSchema.extend(schemaShape);
  }
}
