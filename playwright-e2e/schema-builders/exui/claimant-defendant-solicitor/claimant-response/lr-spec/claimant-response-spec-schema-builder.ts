import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimantResponseSpecType from '../../../../../constants/ccd-events/claimant-response-spec/claimant-response-spec-type';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import claimantResponseSpecSchemaComponents from './claimant-response-spec-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class ClaimantResponseSpecSchemaBuilder extends BaseSchemaBuilder {
  async buildFastRejectFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, { claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildInterRejectFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
    });
  }

  async buildInterProceed1v2DS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
    });
  }

  async buildMultiRejectFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.MULTI_CLAIM,
    });
  }

  async buildMultiRejectFullDefence1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.MULTI_CLAIM,
    });
  }

  async buildMultiRejectFullDefence1v2DS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.MULTI_CLAIM,
    });
  }

  async buildFastRejectPartAdmit(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT,
    });
  }

  async buildSmallRejectPartAdmitHasPaidConfirmNotPaid(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.SMALL_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT_PAID_CONFIRM_NOT_PAID,
    });
  }

  async buildSmallRejectPartAdmitPaidConfirmPaid(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.SMALL_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT_PAID_CONFIRM_PAID,
    });
  }

  async buildInterRejectPartAdmit(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT,
    });
  }

  async buildMultiRejectPartAdmit(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.MULTI_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT,
    });
  }

  async buildFullAdmitImmediately(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_ADMIT,
    });
  }

  async buildFullAdmitSetDate(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_ADMIT,
    });
  }

  async buildFullAdmitRepayment(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_ADMIT,
    });
  }

  async buildAcceptFullAdmitRepayment(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_ADMIT_REPAYMENT,
    });
  }

  async buildSmallRejectPartAdmit(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.SMALL_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.REJECT_PART_ADMIT,
    });
  }

  async buildFastRejectFullDefence2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastAcceptFullDefence2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_DEFENCE,
    });
  }

  async buildFastRejectFullDefence1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastRejectFullDefence1v2DS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildFastAcceptFullDefence1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimantResponseSpecType: ClaimantResponseSpecType.ACCEPT_FULL_DEFENCE,
    });
  }

  async buildSmallRejectFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, { claimTrack: ClaimTrack.SMALL_CLAIM });
  }

  async buildSmallRejectFullDefence2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  async buildSmallRejectFullDefence1v2SS(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
    });
  }

  async buildSmallRejectFullDefence1v2DS(caseDataBeforeSubmission?: CCDCaseData) {
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
      claimantResponseSpecType = ClaimantResponseSpecType.REJECT_FULL_DEFENCE,
    }: {
      claimType?: ClaimType;
      claimTrack?: ClaimTrack;
      claimantResponseSpecType?: ClaimantResponseSpecType;
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;
    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      claimantResponseSpecSchemaComponents.undefine,
      claimantResponseSpecSchemaComponents.defendantResponse(claimType, claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.ccjPaymentPaidSome(claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.intentionToSettle(claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.fixedCost(claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.claimantDefenceResponseDocument(claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.mediationContactInformation(
        claimTrack,
        claimantResponseSpecType,
      ),
      claimantResponseSpecSchemaComponents.mediationAvailability(claimTrack, claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.determinationWithoutHearing(
        claimTrack,
        claimantResponseSpecType,
      ),
      claimantResponseSpecSchemaComponents.fileDirectionsQuestionnaire(
        claimTrack,
        claimantResponseSpecType,
      ),
      claimantResponseSpecSchemaComponents.fixedRecoverableCosts(claimTrack, claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.fixedRecoverableCostsIntermediate(
        claimTrack,
        claimantResponseSpecType,
      ),
      claimantResponseSpecSchemaComponents.disclosureOfElectronicDocuments(
        claimTrack,
        claimantResponseSpecType,
      ),
      claimantResponseSpecSchemaComponents.disclosureOfNonElectronicDocuments(
        claimTrack,
        claimantResponseSpecType,
      ),
      claimantResponseSpecSchemaComponents.disclosureReport(claimTrack, claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.experts(claimTrack, claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.witnesses(claimTrack, claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.language(claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.hearing(claimTrack, claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.requestedCourtLocation(claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.hearingSupport(claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.vulnerabilityQuestions(claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.application(claimTrack, claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.ccjJudgmentSummary(claimantResponseSpecType),
      claimantResponseSpecSchemaComponents.ignore,
    );

    return baseSchema.extend(schemaShape);
  }
}
