import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import caseFlagsSchemaComponents from './case-flag-schema-components';

@AllMethodsStep()
export default class CaseFlagsSchemaBuilder extends BaseSchemaBuilder {
  async buildSchema(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...caseFlagsSchemaComponents.caseFlags,
    });
  }

  async buildApplicant1SpecialMeasureSchema(
    caseDataBeforeSubmission?: CCDCaseData,
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...caseFlagsSchemaComponents.applicant1Flags,
    });
  }
}
