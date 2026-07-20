import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import SendAndReplyDataBuilder from '../common/send-and-reply/send-and-reply-data-builder';
import CreateSdoDataBuilder from './create-sdo/create-sdo-data-builder';
import GenerateDirectionsOrderDataBuilder from './generate-directions-order/generate-directions-order-data-builder';
import NotSuitableSdoDataBuilder from './not-suitable-sdo/not-suitable-sdo-data-builder';
import SdoDJDataBuilder from './sdo-dj/sdo-dj-data-builder';

export default class JudgeLADataBuilderFactory extends BaseDataBuilderFactory {
  get createSdoDataBuilder() {
    return new CreateSdoDataBuilder(this.requestsFactory, this.testData);
  }

  get generateDirectionsOrderDataBuilder() {
    return new GenerateDirectionsOrderDataBuilder(this.requestsFactory, this.testData);
  }

  get notSuitableSdoDataBuilder() {
    return new NotSuitableSdoDataBuilder(this.requestsFactory, this.testData);
  }

  get sendAndReplyDataBuilder() {
    return new SendAndReplyDataBuilder(this.requestsFactory, this.testData);
  }

  get sdoDJDataBuilder() {
    return new SdoDJDataBuilder(this.requestsFactory, this.testData);
  }
}
