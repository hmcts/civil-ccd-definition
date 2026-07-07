import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response/lr-spec/defendant-response-spec-type';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import defendantResponseSpecSchemaComponents from './defendant-response-spec-schema-components';
import partys from '../../../../../constants/users/partys';
import { Party } from '../../../../../models/users/partys';
import PaymentTypeSpec from '../../../../../constants/ccd-events/defendant-response/lr-spec/payment-type-spec';
import DefenceRouteSpec from '../../../../../constants/ccd-events/defendant-response/lr-spec/defence-route-spec';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class DefendantResponseSpecSchemaBuilder extends BaseSchemaBuilder {
  async buildFast1v1FullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildDS1FastPartAdmitImmediately(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildDS1FullAdmitImmediately(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      responseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.IMMEDIATELY,
    });
  }

  async buildDS1FullAdmitSetDate1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      responseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildDS1FullAdmitRepayment2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      responseType: DefendantResponseSpecType.FULL_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildDS1SmallPartAdmitImmediately(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.PART_ADMISSION,
    });
  }

  async buildDS1FastPartAdmitSetDate1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildDS1SmallPartAdmitSetDate1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.BY_SET_DATE,
    });
  }

  async buildDS1FastPartAdmitRepayment2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildDS1SmallPartAdmitRepayment2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.PART_ADMISSION,
      paymentTypeSpec: PaymentTypeSpec.REPAYMENT_PLAN,
    });
  }

  async buildDS2FastFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  async buildDS2SmallFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  async buildFast2v1FullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildSmall2v1FullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildFast1v2SSFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildSmall1v1FullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildSmall1v2SSFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildSmall1v2DSFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildDS2Small1v2DSFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission: CCDCaseData | undefined,
    {
      claimType = ClaimType.ONE_VS_ONE,
      claimTrack = ClaimTrack.SMALL_CLAIM,
      responseType = DefendantResponseSpecType.FULL_DEFENCE,
      defenceRouteSpec = DefenceRouteSpec.DISPUTE,
      paymentTypeSpec = PaymentTypeSpec.IMMEDIATELY,
      defendantSolicitorParty = partys.DEFENDANT_SOLICITOR_1,
    }: {
      caseDataBeforeSubmission?: CCDCaseData;
      claimType?: ClaimType;
      claimTrack?: ClaimTrack;
      responseType?: DefendantResponseSpecType;
      defenceRouteSpec?: DefenceRouteSpec;
      paymentTypeSpec?: PaymentTypeSpec;
      defendantSolicitorParty?: Party;
    },
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    const responseSchemaFields: z.ZodRawShape = {};

    Object.assign(
      responseSchemaFields,
      defendantResponseSpecSchemaComponents.responseClaimTrack,
      defendantResponseSpecSchemaComponents.singleResponse(claimType),
      defendantResponseSpecSchemaComponents.responseConfirmNameAddress(claimType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.responseConfirmDetails(defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.respondentResponseType(
        responseType,
        claimType,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.defenceRoute(
        responseType,
        defenceRouteSpec,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.defenceAdmittedPartRoute(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.upload(responseType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.timeline(responseType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.whenWillClaimBePaid(responseType, paymentTypeSpec, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.defendant1FinancialDetails(responseType, paymentTypeSpec, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.defendant2FinancialDetails(responseType, paymentTypeSpec, claimType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.defendant1RepaymentPlan(responseType, paymentTypeSpec, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.defendant2RepaymentPlan(responseType, paymentTypeSpec, claimType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.mediationContactInformation(responseType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.mediationAvailability(responseType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.deterWithoutHearing(responseType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.fastTrackDq(responseType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.experts(responseType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.witnesses(responseType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.language(responseType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.hearing(responseType, claimTrack, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.requestedCourtLocation(responseType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.hearingSupport(responseType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.vulnerabilityQuestions(responseType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.applications(responseType, claimTrack, defendantSolicitorParty),
    );

    return baseSchema.extend(responseSchemaFields);
  }
}
