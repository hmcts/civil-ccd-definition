import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import QueryManagementRespondSchemaBuilder from '../common/query-management-respond/query-management-respond-schema-builder';
import SendAndReplySchemaBuilder from '../common/send-and-reply/send-and-reply-schema-builder';

export default class CtscAdminSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get sendAndReplySchemaBuilder() {
    return new SendAndReplySchemaBuilder(this.testData);
  }

  get queryManagementRespondSchemaBuilder() {
    return new QueryManagementRespondSchemaBuilder(this.testData);
  }
}
