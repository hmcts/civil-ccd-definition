import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import MakeDecisionDataBuilder from './make-decision/make-decision-data-builder';
import GaGenerateDirectionsOrderDataBuilder from './generate-directions-order/generate-directions-order-data-builder';

export default class JudgeGaDataBuilderFactory extends BaseDataBuilderFactory {
  get makeDecisionDataBuilder() {
    return new MakeDecisionDataBuilder(this.requestsFactory, this.testData);
  }

  get generateDirectionsOrderDataBuilder() {
    return new GaGenerateDirectionsOrderDataBuilder(this.requestsFactory, this.testData);
  }
}
