import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import manageCaseFlagsSchemaBuilderComponents from './manage-case-flags-schema-builder-components';

@AllMethodsStep()
export default class ManageCaseFlagsSchemaBuilder extends BaseSchemaBuilder {

  async buildCaseFlags(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      ...manageCaseFlagsSchemaBuilderComponents.caseFlags,
    });
  }

  async buildApplicant1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      ...manageCaseFlagsSchemaBuilderComponents.applicant1,
    });
  }

  async buildRespondent1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      ...manageCaseFlagsSchemaBuilderComponents.respondent1,
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
