import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import DefendantResponseType from '../../../../../constants/ccd-events/defendant-response/unspec/defendant-response-type';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import defendantResponseSchemaComponents from './defendant-response-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class DefendantResponseSchemaBuilder extends BaseSchemaBuilder {
  async buildFastTrack1v1FullDefence(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseType.FULL_DEFENCE,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission: CCDCaseData | undefined,
    {
      claimTrack = ClaimTrack.SMALL_CLAIM,
      responseType = DefendantResponseType.FULL_DEFENCE,
    }: {
      caseDataBeforeSubmission?: CCDCaseData;
      claimTrack?: ClaimTrack;
      responseType?: DefendantResponseType;
    } = {},
  ): Promise<z.ZodType> {
    const schemaCaseData = structuredClone(caseDataBeforeSubmission);

    const baseSchema = ZodHelper.createSchemaFromJson(schemaCaseData, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      defendantResponseSchemaComponents.confirmDetails,
      defendantResponseSchemaComponents.solicitorReferences,
      defendantResponseSchemaComponents.respondentResponseType(responseType),
      defendantResponseSchemaComponents.upload,
      defendantResponseSchemaComponents.fastTrackDq(claimTrack),
      defendantResponseSchemaComponents.experts,
      defendantResponseSchemaComponents.witnesses,
      defendantResponseSchemaComponents.language,
      defendantResponseSchemaComponents.hearing,
      defendantResponseSchemaComponents.draftDirections,
      defendantResponseSchemaComponents.requestedCourt(),
      defendantResponseSchemaComponents.hearingSupport,
      defendantResponseSchemaComponents.vulnerabilityQuestions,
      defendantResponseSchemaComponents.furtherInformation,
      defendantResponseSchemaComponents.statementOfTruth,
    );

    return baseSchema.extend(schemaShape);
  }
}
