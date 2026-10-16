import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import InitiateGeneralApplicationAfterPaymentDataBuilder from './initiate-general-application-after-payment/initiate-general-application-after-payment-data-builder';
import RespondToApplicationDataBuilder from './respond-to-application/respond-to-application-data-builder';
import RespondToJudgeAdditionalInfoDataBuilder from './respond-to-judge-additional-info/respond-to-judge-additional-info-data-builder';

export default class ClaimantDefendantSolicitorGaDataBuilderFactory extends BaseDataBuilderFactory {
  get initiateGeneralApplicationAfterPaymentDataBuilder() {
    return new InitiateGeneralApplicationAfterPaymentDataBuilder(
      this.requestsFactory,
      this.testData,
    );
  }

  get respondToApplicationDataBuilder() {
    return new RespondToApplicationDataBuilder(this.requestsFactory, this.testData);
  }

  get respondToJudgeAdditionalInfoDataBuilder() {
    return new RespondToJudgeAdditionalInfoDataBuilder(this.requestsFactory, this.testData);
  }
}
