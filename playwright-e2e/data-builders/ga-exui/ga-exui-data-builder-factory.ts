import BaseDataBuilderFactory from '../../base/base-data-builder-factory';
import InitiateGeneralApplicationSpecAfterPaymentDataBuilder from './initiate-general-application-after-payment/lr-spec/initiate-general-application-spec-after-payment-data-builder';
import InitiateGeneralApplicationAfterPaymentDataBuilder from './initiate-general-application-after-payment/unspec/initiate-general-application-after-payment-data-builder';

export default class GaExuiDataBuilderFactory extends BaseDataBuilderFactory {
  get initiateGeneralApplicationAfterPaymentDataBuilder() {
    return new InitiateGeneralApplicationAfterPaymentDataBuilder(
      this.requestsFactory,
      this.testData,
    );
  }

  get initiateGeneralApplicationSpecAfterPaymentDataBuilder() {
    return new InitiateGeneralApplicationSpecAfterPaymentDataBuilder(
      this.requestsFactory,
      this.testData,
    );
  }
}
