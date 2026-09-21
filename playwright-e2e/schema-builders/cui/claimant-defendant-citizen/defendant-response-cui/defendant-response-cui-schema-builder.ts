import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import ClaimTrack from '../../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../../constants/ccd-events/cui-ccd-events/defendant-response-cui/defendant-response-spec-type';
import PaymentTypeSpec from '../../../../constants/ccd-events/cui-ccd-events/defendant-response-cui/payment-type-spec';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import defendantResponseCuiSchemaBuilderComponents from './defendant-response-cui-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class DefendantResponseCuiSchemaBuilder extends BaseSchemaBuilder {
  async buildSmallFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildFastFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildInterFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
    });
  }

  async buildMultiFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.MULTI_CLAIM,
    });
  }

  async buildFastFullAdmitImmediately(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.IMMEDIATELY,
    });
  }

  async buildFastFullAdmitSetDate(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildFastFullAdmitRepayment(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildSmallFullAdmitImmediately(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.IMMEDIATELY,
    });
  }

  async buildSmallFullAdmitSetDate(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildSmallFullAdmitRepayment(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      defendantResponseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildSmallPartAdmitImmediately(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.IMMEDIATELY,
    });
  }

  async buildFastPartAdmitImmediately(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.IMMEDIATELY,
    });
  }

  async buildSmallPartAdmitSetDate(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildFastPartAdmitSetDate(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildSmallPartAdmitRepayment(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildFastPartAdmitRepayment(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      defendantResponseType = DefendantResponseSpecType.FULL_DEFENCE,
      paymentTypeSpec = PaymentTypeSpec.IMMEDIATELY,
      claimTrack = ClaimTrack.SMALL_CLAIM,
    }: {
      defendantResponseType?: DefendantResponseSpecType;
      paymentTypeSpec?: PaymentTypeSpec;
      claimTrack?: ClaimTrack;
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      defendantResponseCuiSchemaBuilderComponents.responseType(defendantResponseType),
      defendantResponseCuiSchemaBuilderComponents.paymentTimeRoute(
        claimTrack,
        defendantResponseType,
        paymentTypeSpec,
      ),
      defendantResponseCuiSchemaBuilderComponents.partAdmitPaymentDetails(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiSchemaBuilderComponents.totalClaimAmount(claimTrack),
      defendantResponseCuiSchemaBuilderComponents.defendant1(),
      defendantResponseCuiSchemaBuilderComponents.lipResponse(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiSchemaBuilderComponents.mediation(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiSchemaBuilderComponents.disputeDetails(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiSchemaBuilderComponents.language(defendantResponseType),
      defendantResponseCuiSchemaBuilderComponents.vulnerability(defendantResponseType),
      defendantResponseCuiSchemaBuilderComponents.requestedCourt(defendantResponseType),
      defendantResponseCuiSchemaBuilderComponents.witnesses(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiSchemaBuilderComponents.hearingSmallClaim(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiSchemaBuilderComponents.hearingFastClaim(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiSchemaBuilderComponents.experts(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiSchemaBuilderComponents.hearingSupport(defendantResponseType),
      defendantResponseCuiSchemaBuilderComponents.interMultiTrackDirections(
        claimTrack,
        defendantResponseType,
      ),
      defendantResponseCuiSchemaBuilderComponents.financialDetails(
        defendantResponseType,
        paymentTypeSpec,
      ),
      defendantResponseCuiSchemaBuilderComponents.respondentResponsePcq(),
    );

    return baseSchema.extend(schemaShape);
  }
}
