import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import DefendantResponseType from '../../../../../constants/ccd-events/ccd-events/defendant-response/defendant-response-type';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import defendantResponseSchemaComponents from './defendant-response-schema-components';
import partys from '../../../../../constants/users/partys';
import UnspecDefendantResponseOptions from '../../../../../models/ccd-events/cui-ccd-events/defendant-response-options';
import { Party } from '../../../../../models/users/partys';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class DefendantResponseSchemaBuilder extends BaseSchemaBuilder {
  async buildDefendantResponseDS1(
    caseDataBeforeSubmission?: CCDCaseData,
    options: UnspecDefendantResponseOptions = {},
  ): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, options);
  }

  async buildDefendantResponseDS2(
    caseDataBeforeSubmission?: CCDCaseData,
    options: UnspecDefendantResponseOptions = {},
  ): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, options, partys.DEFENDANT_SOLICITOR_2);
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      claimType = ClaimType.ONE_VS_ONE,
      claimTrack = ClaimTrack.SMALL_CLAIM,
      responseType = DefendantResponseType.FULL_DEFENCE,
    }: UnspecDefendantResponseOptions = {},
    defendantSolicitorParty: Party = partys.DEFENDANT_SOLICITOR_1,
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
