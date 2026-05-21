import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import informAgreedExtensionDateSchemaComponents from './inform-agreed-extension-date-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class InformAgreedExtensionDateSchemaBuilder extends BaseSchemaBuilder {
  async buildSchemaDS1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  protected async buildSchema(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    let baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;
    baseSchema = baseSchema.omit({
      isRespondent1: true,
    });

    return baseSchema.extend({
      ...informAgreedExtensionDateSchemaComponents.extensionDate,
    });
  }
}
