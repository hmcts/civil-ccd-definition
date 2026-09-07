import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import serviceHearingValuesSpecSchemaBuilderComponents from './service-hearing-values-spec-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class ServiceHearingValuesSpecSchemaBuilder extends BaseSchemaBuilder {
  async build() {
    return this.buildSchema();
  }

  protected async buildSchema(): Promise<z.ZodType> {
    const schemaShape: Record<string, z.ZodType> = {};

    Object.assign(
      schemaShape,
      serviceHearingValuesSpecSchemaBuilderComponents.caseDetails,
      serviceHearingValuesSpecSchemaBuilderComponents.caseCategories,
      serviceHearingValuesSpecSchemaBuilderComponents.hearingLocations,
      serviceHearingValuesSpecSchemaBuilderComponents.parties,
      serviceHearingValuesSpecSchemaBuilderComponents.screenFlow,
      serviceHearingValuesSpecSchemaBuilderComponents.hearingChannels,
    );

    return z.looseObject(schemaShape);
  }
}
