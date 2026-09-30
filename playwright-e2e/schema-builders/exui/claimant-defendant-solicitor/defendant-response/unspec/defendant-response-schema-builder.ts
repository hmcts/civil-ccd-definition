import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import defendantResponseSchemaComponents from './defendant-response-schema-components';
import partys from '../../../../../constants/users/partys';
import DefendantResponseOptions from '../../../../../models/ccd-events/ccd-events/defendant-response/defendant-response-options';

@AllMethodsStep()
export default class DefendantResponseSchemaBuilder extends BaseSchemaBuilder {
  async buildSchema(
    caseDataBeforeSubmission: CCDCaseData | undefined,
    {
      claimType,
      claimTrack,
      responseType,
      defendantSolicitorParty = partys.DEFENDANT_SOLICITOR_1,
    }: Required<DefendantResponseOptions>,
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      defendantResponseSchemaComponents.confirmDetails,
      defendantResponseSchemaComponents.singleResponse(claimType),
      defendantResponseSchemaComponents.respondentResponseType(
        claimType,
        responseType,
        defendantSolicitorParty,
      ),
      defendantResponseSchemaComponents.solicitorReferences,
      defendantResponseSchemaComponents.upload,
      defendantResponseSchemaComponents.deterWithoutHearing(claimTrack, defendantSolicitorParty),
      defendantResponseSchemaComponents.fileDirectionsQuestionnaire(
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSchemaComponents.fixedRecoverableCosts(claimTrack, defendantSolicitorParty),
      defendantResponseSchemaComponents.fixedRecoverableCostsIntermediate(
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSchemaComponents.disclosureOfElectronicDocuments(
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSchemaComponents.disclosureOfNonElectronicDocuments(
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSchemaComponents.experts(defendantSolicitorParty),
      defendantResponseSchemaComponents.witnesses(defendantSolicitorParty),
      defendantResponseSchemaComponents.language(defendantSolicitorParty),
      defendantResponseSchemaComponents.hearing(defendantSolicitorParty),
      defendantResponseSchemaComponents.draftDirections,
      defendantResponseSchemaComponents.requestedCourt(defendantSolicitorParty),
      defendantResponseSchemaComponents.hearingSupport(defendantSolicitorParty),
      defendantResponseSchemaComponents.vulnerabilityQuestions(defendantSolicitorParty),
      defendantResponseSchemaComponents.furtherInformation(defendantSolicitorParty),
      defendantResponseSchemaComponents.statementOfTruth(defendantSolicitorParty),
      defendantResponseSchemaComponents.undefine(defendantSolicitorParty),
    );

    return baseSchema.extend(schemaShape);
  }
}
