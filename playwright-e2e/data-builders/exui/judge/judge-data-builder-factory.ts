import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import CreateSdoDataBuilder from './create-sdo/create-sdo-data-builder';
import GenerateDirectionsOrderDataBuilder from './generate-directions-order/generate-directions-order-data-builder';

export default class JudgeDataBuilderFactory extends BaseDataBuilderFactory {
  get createSdoDataBuilder() {
    return new CreateSdoDataBuilder(this.requestsFactory, this.testData);
  }

  get generateDirectionsOrderDataBuilder() {
    return new GenerateDirectionsOrderDataBuilder(this.requestsFactory, this.testData);
  }
}
