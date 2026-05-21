import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import amendPartyDetailsSchemaBuilderComponents from './amend-party-details-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class AmendPartyDetailsSchemaBuilder extends BaseSchemaBuilder {
  async buildData(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  protected async buildSchema(): Promise<z.ZodType> {
    return z.looseObject({
      ...amendPartyDetailsSchemaBuilderComponents.email,
    });
  }
}
