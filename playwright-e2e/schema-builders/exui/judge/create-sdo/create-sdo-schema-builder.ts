import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import createSdoSchemaBuilderComponents from './create-sdo-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class CreateSdoSchemaBuilder extends BaseSchemaBuilder {
  async buildFastTrackSdo(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  protected async buildSchema(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...createSdoSchemaBuilderComponents.sdo,
      ...createSdoSchemaBuilderComponents.claimsTrack,
      ...createSdoSchemaBuilderComponents.orderType,
      ...createSdoSchemaBuilderComponents.fastTrack,
    });
  }
}
