import { z } from 'zod';
import initiateGeneralApplicationAfterPaymentSchemaBuilderComponents from './initiate-general-application-after-payment-schema-builder-components';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import ZodHelper from '../../../../helpers/zod-helper';
import GaCCDCaseData from '../../../../models/ga-ccd-case-data';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class InitiateGeneralApplicationAfterPaymentSchemaBuilder extends BaseSchemaBuilder {
  async build(gaCaseDataBeforeSubmission?: GaCCDCaseData) {
    return this.buildSchema(gaCaseDataBeforeSubmission);
  }

  protected async buildSchema(gaCaseDataBeforeSubmission?: GaCCDCaseData): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(gaCaseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...initiateGeneralApplicationAfterPaymentSchemaBuilderComponents,
    });
  }
}
