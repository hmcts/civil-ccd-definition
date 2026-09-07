import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import partys from '../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import { Party } from '../../../../models/users/partys';
import requestForReconsiderationLipSchemaBuilderComponents from './request-for-reconsideration-lip-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class RequestForReconsiderationLipSchemaBuilder extends BaseSchemaBuilder {
  async build(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildClaimant(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, { party: partys.CLAIMANT_1 });
  }

  async buildDefendant(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, { party: partys.DEFENDANT_1 });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      party = partys.CLAIMANT_1,
    }: {
      party?: Party;
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...requestForReconsiderationLipSchemaBuilderComponents.requestForReviewComments(party),
    });
  }
}
