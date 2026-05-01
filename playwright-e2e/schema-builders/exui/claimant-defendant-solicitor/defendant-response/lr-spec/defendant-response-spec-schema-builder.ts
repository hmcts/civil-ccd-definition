import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response-spec/defendant-response-spec-type';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import defendantResponseSpecSchemaComponents from './defendant-response-spec-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class DefendantResponseSpecSchemaBuilder extends BaseSchemaBuilder {
  async buildFastTrack1v1FullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildFastTrack2v1FullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildFastTrack1v2SSFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildSmallTrack1v1FullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildSmallTrack1v2SSFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  protected async buildSchema(caseDataBeforeSubmission: CCDCaseData | undefined, {
    claimType = ClaimType.ONE_VS_ONE,
    claimTrack = ClaimTrack.SMALL_CLAIM,
    responseType= DefendantResponseSpecType.FULL_DEFENCE,
  }: {
    caseDataBeforeSubmission?: CCDCaseData;
    claimType: ClaimType;
    claimTrack: ClaimTrack;
    responseType: DefendantResponseSpecType;
  }): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;
    
    return baseSchema.extend({
      ...defendantResponseSpecSchemaComponents.responseClaimTrack(claimTrack),
      ...defendantResponseSpecSchemaComponents.singleResponse(claimType),
      ...defendantResponseSpecSchemaComponents.responseConfirmNameAddress(claimType),
      ...defendantResponseSpecSchemaComponents.responseConfirmDetails,
      ...defendantResponseSpecSchemaComponents.respondentResponseType(responseType, claimType),
      ...defendantResponseSpecSchemaComponents.defenceRoute,
      ...defendantResponseSpecSchemaComponents.upload,
      ...defendantResponseSpecSchemaComponents.timeline,
      ...defendantResponseSpecSchemaComponents.determinationWithoutHearing(claimTrack),
      ...defendantResponseSpecSchemaComponents.fastTrackDq(claimTrack),
      ...defendantResponseSpecSchemaComponents.experts(claimTrack),
      ...defendantResponseSpecSchemaComponents.witnesses(claimTrack),
      ...defendantResponseSpecSchemaComponents.language,
      ...defendantResponseSpecSchemaComponents.hearing(claimTrack),
      ...defendantResponseSpecSchemaComponents.requestedCourtLocation,
      ...defendantResponseSpecSchemaComponents.hearingSupport,
      ...defendantResponseSpecSchemaComponents.vulnerabilityQuestions,
      ...defendantResponseSpecSchemaComponents.applications(claimTrack),
    });
  }
}
