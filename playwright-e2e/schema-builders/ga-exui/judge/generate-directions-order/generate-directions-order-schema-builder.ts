import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import GaCCDCaseData from '../../../../models/ga-ccd-case-data';
import generateDirectionsOrderSchemaBuilderComponents from './generate-directions-order-schema-builder-components';

@AllMethodsStep()
export default class GenerateDirectionsOrderSchemaBuilder extends BaseSchemaBuilder {
  async buildAssistedOrderWithoutFurtherHearing(gaCaseDataBeforeSubmission?: GaCCDCaseData) {
    return this.buildSchema(gaCaseDataBeforeSubmission);
  }

  protected async buildSchema(gaCaseDataBeforeSubmission?: GaCCDCaseData): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(gaCaseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend(
      generateDirectionsOrderSchemaBuilderComponents.assistedOrderWithoutFurtherHearing,
    );
  }
}
