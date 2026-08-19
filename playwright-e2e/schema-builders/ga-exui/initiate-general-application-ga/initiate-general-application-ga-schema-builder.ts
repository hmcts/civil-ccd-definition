import { z } from 'zod';
import BaseSchemaBuilder from '../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../decorators/test-steps';
import initiateGeneralApplicationGaSchemaBuilderComponents from './initiate-general-application-ga-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class InitiateGeneralApplicationGaSchemaBuilder extends BaseSchemaBuilder {
  async build() {
    return this.buildSchema();
  }

  protected async buildSchema(): Promise<z.ZodType> {
    const schemaShape: Record<string, z.ZodType> = {};
    
    Object.assign({
      schemaShape,
      ...initiateGeneralApplicationGaSchemaBuilderComponents,
    });

    return z.looseObject(schemaShape);
  }
}
