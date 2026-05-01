import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimantResponseSpecType from '../../../../../constants/ccd-events/claimant-response-spec-type/claimant-response-spec-type';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import claimantResponseSpecSchemaComponents from './claimant-response-spec-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class ClaimantResponseSpecSchemaBuilder extends BaseSchemaBuilder {
  async buildFastTrack1v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, { claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildFastTrack1v1DoNotProceed(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildFastTrack2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastTrack2v1DoNotProceed(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildFastTrack1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastTrack1v2SSDoNotProceed(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildSmallTrack1v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, { claimTrack: ClaimTrack.SMALL_CLAIM });
  }

  async buildSmallTrack1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  protected async buildSchema(caseDataBeforeSubmission?: CCDCaseData, {
    claimType = ClaimType.ONE_VS_ONE,
    claimTrack = ClaimTrack.FAST_CLAIM,
    claimantResponseType = ClaimantResponseSpecType.PROCEED_WITH_CLAIM,
  }: {
    claimType?: ClaimType;
    claimTrack?: ClaimTrack;
    claimantResponseType?: ClaimantResponseSpecType;
  } = {}): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;
    const schemaBeforeSubmission = baseSchema.omit({
      nextDeadline: true,
    });

    const schemaShape = {
      ...claimantResponseSpecSchemaComponents.proceedWithClaim(claimType),
    };

    if (claimantResponseType === ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM) {
      return schemaBeforeSubmission.extend(schemaShape);
    }

    return schemaBeforeSubmission.extend({
      ...schemaShape,
      ...claimantResponseSpecSchemaComponents.determinationWithoutHearing(claimTrack),
      ...claimantResponseSpecSchemaComponents.fastTrackDq(claimTrack),
      ...claimantResponseSpecSchemaComponents.experts(claimTrack),
      ...claimantResponseSpecSchemaComponents.witnesses(claimTrack),
      ...claimantResponseSpecSchemaComponents.language,
      ...claimantResponseSpecSchemaComponents.hearing(claimTrack),
      ...claimantResponseSpecSchemaComponents.requestedCourtLocation,
      ...claimantResponseSpecSchemaComponents.hearingSupport,
      ...claimantResponseSpecSchemaComponents.vulnerabilityQuestions,
      ...claimantResponseSpecSchemaComponents.applications(claimTrack),
    });
  }
}
