import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import QueryManagementRespondDataBuilder from '../common/query-management-respond/query-management-respond-data-builder';
import SendAndReplyDataBuilder from '../common/send-and-reply/send-and-reply-data-builder';

export default class CtscAdminDataBuilderFactory extends BaseDataBuilderFactory {
  get sendAndReplyDataBuilder() {
    return new SendAndReplyDataBuilder(this.requestsFactory, this.testData);
  }

  get queryManagementRespondDataBuilder() {
    return new QueryManagementRespondDataBuilder(this.requestsFactory, this.testData);
  }
}
