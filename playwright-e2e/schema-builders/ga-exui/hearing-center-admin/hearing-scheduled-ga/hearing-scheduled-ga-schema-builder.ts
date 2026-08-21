import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import GaCCDCaseData from '../../../../models/ga-ccd-case-data';
import hearingScheduledGaSchemaBuilderComponents from './hearing-scheduled-ga-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class HearingScheduledGaSchemaBuilder extends BaseSchemaBuilder {
  async build(gaCaseDataBeforeSubmission?: GaCCDCaseData) {
    return this.buildSchema(gaCaseDataBeforeSubmission);
  }

  protected async buildSchema(gaCaseDataBeforeSubmission?: GaCCDCaseData): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(gaCaseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...hearingScheduledGaSchemaBuilderComponents.hearingScheduledGa,
    });
  }
}
