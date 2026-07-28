import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';

const nonEmptyString = z.string().min(1);

@AllMethodsStep()
export default class CaseProceedsInCasemanSchemaBuilder extends BaseSchemaBuilder {
  async buildSchema(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      claimProceedsInCaseman: z.strictObject({
        date: nonEmptyString,
        reason: nonEmptyString,
        other: nonEmptyString,
      }),
    });
  }
}
