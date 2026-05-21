import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import acknowledgeClaimSchemaComponents from './acknowledge-claim-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class AcknowledgeClaimSchemaBuilder extends BaseSchemaBuilder {
  async buildData(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  protected async buildSchema(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...acknowledgeClaimSchemaComponents.responseIntention,
      ...acknowledgeClaimSchemaComponents.responseDates,
      ...acknowledgeClaimSchemaComponents.solicitorReferences,
    });
  }
}
