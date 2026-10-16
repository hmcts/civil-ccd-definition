import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import MakeDecisionSchemaBuilder from './make-decision/make-decision-schema-builder';
import GenerateDirectionsOrderSchemaBuilder from './generate-directions-order/generate-directions-order-schema-builder';

export default class JudgeGaSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get makeDecisionSchemaBuilder() {
    return new MakeDecisionSchemaBuilder(this.testData);
  }

  get generateDirectionsOrderSchemaBuilder() {
    return new GenerateDirectionsOrderSchemaBuilder(this.testData);
  }
}
