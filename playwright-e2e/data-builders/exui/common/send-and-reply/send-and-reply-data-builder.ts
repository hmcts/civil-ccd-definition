import BaseDataBuilder from '../../../../base/base-data-builder';
import RecipientRoleType from '../../../../constants/ccd-events/send-and-reply/recipient-role-type';
import SendAndReplyOption from '../../../../constants/ccd-events/send-and-reply/send-and-reply-option';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import sendAndReplyDataBuilderComponents from './send-and-reply-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class SendAndReplyDataBuilder extends BaseDataBuilder {
  async buildSendDistrictJudge() {
    return this.buildData();
  }

  async buildReply() {
    return this.buildData({sendAndReplyOption: SendAndReplyOption.REPLY});
  }

  async buildData({
    sendAndReplyOption = SendAndReplyOption.SEND,
    recipientRoleType = RecipientRoleType.DISTRICT_JUDGE,
  }: {
    sendAndReplyOption?: SendAndReplyOption,
    recipientRoleType?: RecipientRoleType,
  } = {}) {
    return {
      ...sendAndReplyDataBuilderComponents.sendAndReplyOption(sendAndReplyOption),
      ...sendAndReplyDataBuilderComponents.sendMessageMetadata(sendAndReplyOption, recipientRoleType),
      ...sendAndReplyDataBuilderComponents.replyToMessage(sendAndReplyOption),
      ...sendAndReplyDataBuilderComponents.sendMessageContent(),
    };
  }
}
