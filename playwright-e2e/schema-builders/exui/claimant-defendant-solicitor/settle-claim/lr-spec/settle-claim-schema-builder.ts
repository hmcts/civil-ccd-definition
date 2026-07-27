import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import ClaimType from '../../../../../constants/cases/claim-type';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import settleClaimSchemaComponents from './settle-claim-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class SettleClaimSchemaBuilder extends BaseSchemaBuilder {
  async build(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async build2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, { claimType: ClaimType.TWO_VS_ONE });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      claimType = ClaimType.ONE_VS_ONE,
    }: {
      claimType?: ClaimType;
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...settleClaimSchemaComponents.singleClaimant(claimType),
      ...settleClaimSchemaComponents.multipleClaimant(claimType),
    });
  }
}
