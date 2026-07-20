import RecipientRoleType from '../../../../constants/ccd-events/send-and-reply/recipient-role-type';
import SendAndReplyOption from '../../../../constants/ccd-events/send-and-reply/send-and-reply-option';
import { MessagesToReplyTo } from '../../../../models/ccd-case-data';

const sendAndReplyOption = (sendAndReplyOption: SendAndReplyOption) => {
  return {
    sendAndReplyOption: (messagesToReply: MessagesToReplyTo) => {
      if (sendAndReplyOption === SendAndReplyOption.SEND) {
        return {
            sendAndReplyOption: sendAndReplyOption
          }
      } else if (sendAndReplyOption === SendAndReplyOption.REPLY) {
        return {
          sendAndReplyOption: sendAndReplyOption,
            messagesToReplyTo: {
              list_items: [messagesToReply.list_items![0]],
              value: messagesToReply.list_items![0]
            }
          };
      }

      return {};
    }
  };
};

const sendMessageMetadata = (sendAndReplyOption: SendAndReplyOption, recipientRoleType: RecipientRoleType) => {
  if (sendAndReplyOption === SendAndReplyOption.SEND) {
    return {
      sendMessageMetaData: {
        sendMessageMetadata: {
          recipientRoleType: recipientRoleType,
          isUrgent: 'No',
          subjectType: 'APPLICATION',
          subject: 'Test'
        }
      }
    }
  }

  return {};
}

const replyToMessage = (sendAndReplyOption: SendAndReplyOption) => {
  if (sendAndReplyOption === SendAndReplyOption.REPLY) {
    return {
      replyToMessage: {
        messageReplyMetadata: {
          isUrgent: 'No',
          messageContent: 'Test reply'
        },
      }
    }
  }
}

const sendMessageContent = () => {
  return {
    sendMessageContent: {
      sendMessageContent: 'Test Message'
    }
  }
}

export default {
  sendAndReplyOption,
  sendMessageMetadata,
  replyToMessage,
  sendMessageContent,
};
