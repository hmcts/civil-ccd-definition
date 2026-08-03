import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import trialReadinessSchemaComponents from './trial-readiness-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class TrialReadinessSchemaBuilder extends BaseSchemaBuilder {
  async buildApplicant(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  protected async buildSchema(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...trialReadinessSchemaComponents.applicantTrialReady(),
    });
  }
}
