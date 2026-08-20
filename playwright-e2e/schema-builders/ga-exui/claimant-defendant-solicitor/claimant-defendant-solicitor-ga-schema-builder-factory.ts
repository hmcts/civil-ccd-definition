import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import InitiateGeneralApplicationAfterPaymentSchemaBuilder from './initiate-general-application-after-payment/initiate-general-application-after-payment-schema-builder';
import InitiateGeneralApplicationGaSchemaBuilder from './initiate-general-application-ga/initiate-general-application-ga-schema-builder';
import RespondToApplicationSchemaBuilder from './respond-to-application/respond-to-application-schema-builder';
import RespondToJudgeAdditionalInfoSchemaBuilder from './respond-to-judge-additional-info/respond-to-judge-additional-info-schema-builder';

export default class ClaimantDefendantSolicitorGaSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get initiateGeneralApplicationGaSchemaBuilder() {
    return new InitiateGeneralApplicationGaSchemaBuilder(this.testData);
  }

  get respondToApplicationSchemaBuilder() {
    return new RespondToApplicationSchemaBuilder(this.testData);
  }

  get respondToJudgeAdditionalInfoSchemaBuilder() {
    return new RespondToJudgeAdditionalInfoSchemaBuilder(this.testData);
  }
  
  get initiateGeneralApplicationAfterPaymentSchemaBuilder() {
    return new InitiateGeneralApplicationAfterPaymentSchemaBuilder(this.testData);
  }
}
