import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimantResponseSpecType from '../../../../../constants/ccd-events/claimant-response-spec-type/claimant-response-spec-type';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import claimantResponseSpecSchemaComponents from './claimant-response-spec-schema-components';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response/lr-spec/defendant-response-spec-type';
import PaymentTypeSpec from '../../../../../constants/ccd-events/defendant-response/lr-spec/payment-type-spec';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class ClaimantResponseSpecSchemaBuilder extends BaseSchemaBuilder {
  async buildFast(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, { claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildIntermediateProceed(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, { claimTrack: ClaimTrack.INTERMEDIATE_CLAIM });
  }

  async buildFastPartAdmitProceed(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildIntermediatePartAdmitProceed(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildFullAdmitImmediately(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      defendantResponseSpecType: DefendantResponseSpecType.FULL_ADMISSION,
    });
  }

  async buildFullAdmitSetDate(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      defendantResponseSpecType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildFullAdmitRepayment(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      defendantResponseSpecType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildSmallPartAdmitProceed(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildFastDoNotProceed(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildFast2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastDoNotProceed2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildFast1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFast1v2DS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastDoNotProceed1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseType: ClaimantResponseSpecType.DO_NOT_PROCEED_WITH_CLAIM,
    });
  }

  async buildSmall(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, { claimTrack: ClaimTrack.SMALL_CLAIM });
  }

  async buildSmall1v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSmall(caseDataBeforeSubmission);
  }

  async buildSmall2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  async buildSmall1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  async buildSmall1v2DS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      claimType = ClaimType.ONE_VS_ONE,
      claimTrack = ClaimTrack.FAST_CLAIM,
      claimantResponseType = ClaimantResponseSpecType.PROCEED_WITH_CLAIM,
      defendantResponseSpecType = DefendantResponseSpecType.FULL_DEFENCE,
      paymentTypeSpec = PaymentTypeSpec.IMMEDIATELY,
    }: {
      claimType?: ClaimType;
      claimTrack?: ClaimTrack;
      claimantResponseType?: ClaimantResponseSpecType;
      defendantResponseSpecType?: DefendantResponseSpecType;
      paymentTypeSpec?: PaymentTypeSpec;
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;
    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      claimantResponseSpecSchemaComponents.undefine(defendantResponseSpecType),
      claimantResponseSpecSchemaComponents.defendantResponse(
        claimType,
        defendantResponseSpecType,
      ),
      claimantResponseSpecSchemaComponents.defendantResponsePartAdmit(defendantResponseSpecType),
      claimantResponseSpecSchemaComponents.claimantDefenceResponseDocument(
        defendantResponseSpecType,
        claimantResponseType,
      ),
      claimantResponseSpecSchemaComponents.mediationContactInformation(
        defendantResponseSpecType,
        claimTrack,
        claimantResponseType,
      ),
      claimantResponseSpecSchemaComponents.mediationAvailability(
        defendantResponseSpecType,
        claimTrack,
        claimantResponseType,
      ),
      claimantResponseSpecSchemaComponents.determinationWithoutHearing(
        defendantResponseSpecType,
        claimTrack,
        claimantResponseType,
      ),
      claimantResponseSpecSchemaComponents.fastTrackDq(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecSchemaComponents.intermediateTrackDq(
        defendantResponseSpecType,
        claimTrack,
        claimantResponseType,
      ),
      claimantResponseSpecSchemaComponents.experts(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecSchemaComponents.witnesses(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecSchemaComponents.language(defendantResponseSpecType, claimantResponseType),
      claimantResponseSpecSchemaComponents.hearing(defendantResponseSpecType, claimTrack, claimantResponseType),
      claimantResponseSpecSchemaComponents.requestedCourtLocation(defendantResponseSpecType, claimantResponseType),
      claimantResponseSpecSchemaComponents.hearingSupport(defendantResponseSpecType, claimantResponseType),
      claimantResponseSpecSchemaComponents.vulnerabilityQuestions(defendantResponseSpecType),
      claimantResponseSpecSchemaComponents.application(defendantResponseSpecType, claimTrack, claimantResponseType),
    );

    return baseSchema.extend(schemaShape);
  }
}
