import BaseSchemaBuilderFactory from '../../base/base-schema-builder-factory';
import InitiateGeneralApplicationAfterPaymentSchemaBuilder from './initiate-general-application-after-payment/initiate-general-application-after-payment-schema-builder';
import InitiateGeneralApplicationGaSchemaBuilder from './initiate-general-application-ga/initiate-general-application-ga-schema-builder';

export default class GaExuiSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get initiateGeneralApplicationGaSchemaBuilder() {
    return new InitiateGeneralApplicationGaSchemaBuilder(this.testData);
  }
  
  get initiateGeneralApplicationAfterPaymentSchemaBuilder() {
    return new InitiateGeneralApplicationAfterPaymentSchemaBuilder(this.testData);
  }
}
