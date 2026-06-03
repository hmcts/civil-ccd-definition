import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import CreateSdoSchemaBuilder from './create-sdo/create-sdo-schema-builder';

export default class JudgeLASchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get createSdoSchemaBuilder() {
    return new CreateSdoSchemaBuilder(this.testData);
  }
}
