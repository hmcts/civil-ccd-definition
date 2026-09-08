import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import MakeDecisionSchemaBuilder from './make-decision/make-decision-schema-builder';

export default class JudgeGaSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get makeDecisionSchemaBuilder() {
    return new MakeDecisionSchemaBuilder(this.testData);
  }
}
