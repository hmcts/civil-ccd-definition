import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import serviceHearingValuesSchemaBuilderComponents from './service-hearing-values-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class ServiceHearingValuesSchemaBuilder extends BaseSchemaBuilder {
  async build() {
    return this.buildSchema();
  }

  protected async buildSchema(): Promise<z.ZodType> {
    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      serviceHearingValuesSchemaBuilderComponents.caseDetails,
      serviceHearingValuesSchemaBuilderComponents.caseCategories,
      serviceHearingValuesSchemaBuilderComponents.hearingLocations,
      serviceHearingValuesSchemaBuilderComponents.parties,
      serviceHearingValuesSchemaBuilderComponents.screenFlow,
      serviceHearingValuesSchemaBuilderComponents.hearingChannels,
    );

    return z.looseObject(schemaShape);
  }
}
