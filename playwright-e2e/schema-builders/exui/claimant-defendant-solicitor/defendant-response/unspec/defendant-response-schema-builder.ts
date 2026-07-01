import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import DefendantResponseType from '../../../../../constants/ccd-events/defendant-response/unspec/defendant-response-type';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import defendantResponseSchemaComponents from './defendant-response-schema-components';
import partys from '../../../../../constants/users/partys';
import { Party } from '../../../../../models/users/partys';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class DefendantResponseSchemaBuilder extends BaseSchemaBuilder {
  async buildDS1SmallTrackFullDefence1v1(
    caseDataBeforeSubmission?: CCDCaseData,
  ): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.SMALL_CLAIM,
      claimType: ClaimType.ONE_VS_ONE,
      responseType: DefendantResponseType.FULL_DEFENCE,
    });
  }

  async buildDS1FastTrackFullDefence2v1(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.TWO_VS_ONE,
      responseType: DefendantResponseType.FULL_DEFENCE,
    });
  }

  async buildDS1FastTrackFullDefence1v2SS(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      responseType: DefendantResponseType.FULL_DEFENCE,
    });
  }

  async buildDS1FastTrackFullDefence1v2DS(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      responseType: DefendantResponseType.FULL_DEFENCE,
    });
  }

  async buildDS1FastTrackFullDefence(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseType.FULL_DEFENCE,
    });
  }

  async buildDS2FastTrackFullDefence(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseType.FULL_DEFENCE,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  async buildDS2FastTrackFullDefence1v2DS(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      responseType: DefendantResponseType.FULL_DEFENCE,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      claimType = ClaimType.ONE_VS_ONE,
      claimTrack = ClaimTrack.SMALL_CLAIM,
      responseType = DefendantResponseType.FULL_DEFENCE,
      defendantSolicitorParty = partys.DEFENDANT_SOLICITOR_1,
    }: {
      claimType?: ClaimType;
      claimTrack?: ClaimTrack;
      responseType?: DefendantResponseType;
      defendantSolicitorParty?: Party;
    } = {},
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
      defendantResponseSchemaComponents.fastTrackDq(claimTrack, defendantSolicitorParty),
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
      defendantResponseSchemaComponents.undefine(defendantSolicitorParty)
    );

    return baseSchema.extend(schemaShape);
  }
}
