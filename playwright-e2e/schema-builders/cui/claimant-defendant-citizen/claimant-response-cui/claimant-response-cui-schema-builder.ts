import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import ClaimTrack from '../../../../constants/cases/claim-track';
import ClaimantResponseCuiType from '../../../../constants/ccd-events/cui-ccd-events/claimant-response-cui/claimant-response-cui-type';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import claimantResponseCuiSchemaBuilderComponents from './claimant-response-cui-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class ClaimantResponseCuiSchemaBuilder extends BaseSchemaBuilder {
  async buildClaimantResponse(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildSmallRejectFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildSmallRejectPartAdmit(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimantResponseCuiType: ClaimantResponseCuiType.REJECT_PART_ADMIT,
    });
  }

  async buildFastRejectFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.FAST_CLAIM,
    });
  }

  async buildInterRejectFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
    });
  }

  async buildMultiRejectFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: ClaimTrack.MULTI_CLAIM,
    });
  }

  async buildSmallAcceptFullAdmitSetDateCcj(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimantResponseCuiType: ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_SET_DATE_CCJ,
    });
  }

  async buildSmallAcceptFullAdmitRepaymentCcj(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimantResponseCuiType: ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_REPAYMENT_CCJ,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      claimantResponseCuiType = ClaimantResponseCuiType.REJECT_FULL_DEFENCE,
      claimTrack = ClaimTrack.SMALL_CLAIM,
    }: {
      claimantResponseCuiType?: ClaimantResponseCuiType;
      claimTrack?: ClaimTrack;
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      claimantResponseCuiSchemaBuilderComponents.claimant1(
        claimantResponseCuiType,
        this.claimant1PartyType!,
        this.claimantCitizenUser,
      ),
      claimantResponseCuiSchemaBuilderComponents.defendant1(
        claimantResponseCuiType,
        this.defendant1PartyType!,
        this.defendantCitizenUser,
      ),
      claimantResponseCuiSchemaBuilderComponents.lipResponse(
        claimTrack,
        claimantResponseCuiType,
      ),
      claimantResponseCuiSchemaBuilderComponents.mediation(
        claimTrack,
        claimantResponseCuiType,
      ),
      claimantResponseCuiSchemaBuilderComponents.language(claimantResponseCuiType),
      claimantResponseCuiSchemaBuilderComponents.vulnerability(claimantResponseCuiType),
      claimantResponseCuiSchemaBuilderComponents.requestedCourt(claimantResponseCuiType),
      claimantResponseCuiSchemaBuilderComponents.witnesses(claimantResponseCuiType),
      claimantResponseCuiSchemaBuilderComponents.hearingSmallClaim(
        claimTrack,
        claimantResponseCuiType,
      ),
      claimantResponseCuiSchemaBuilderComponents.experts(
        claimTrack,
        claimantResponseCuiType,
      ),
      claimantResponseCuiSchemaBuilderComponents.hearingSupport(claimantResponseCuiType),
      claimantResponseCuiSchemaBuilderComponents.interTrackDirections(
        claimTrack,
        claimantResponseCuiType,
      ),
      claimantResponseCuiSchemaBuilderComponents.ccjResponse(
        claimTrack,
        claimantResponseCuiType,
      ),
      claimantResponseCuiSchemaBuilderComponents.claimResponse(claimantResponseCuiType),
      claimantResponseCuiSchemaBuilderComponents.undefine,
      claimantResponseCuiSchemaBuilderComponents.ignore,
    );

    return baseSchema.extend(schemaShape);
  }
}
