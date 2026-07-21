import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import createCaseFlagsSchemaBuilderComponents from './create-case-flags-schema-builder-components';

@AllMethodsStep()
export default class CreateCaseFlagsSchemaBuilder extends BaseSchemaBuilder {
  async build(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {});
  }

  async buildCaseFlags(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      ...createCaseFlagsSchemaBuilderComponents.caseFlags,
    });
  }

  async buildApplicant1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      ...createCaseFlagsSchemaBuilderComponents.applicant1,
    });
  }

  async buildRespondent1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      ...createCaseFlagsSchemaBuilderComponents.respondent1,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    schema = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend(schema);
  }
}
