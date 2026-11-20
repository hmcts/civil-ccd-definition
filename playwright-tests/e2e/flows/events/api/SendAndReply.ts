import { expect } from '@playwright/test';
import { hearingCentreAdminCredentials, judgeCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { MessageReply, MessageToSend } from '../shared_api_ui/sendAndReplySpecs.ts';

// Sends and replies to messages (SEND_AND_REPLY, "Send and reply to messages") through the CCD API, instead of the
// event's pages in XUI, with the same answers as the UI: the hearing centre admin sends, the judge replies. Unlike the
// UI, a reply sent this way does not complete the judge's "Review message" task, which XUI does when the event is
// submitted.
export class SendAndReply {
  private ccdApiHelper = new CcdApiHelper();

  async send(caseId: string, message: MessageToSend) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'SEND_AND_REPLY', caseId, [
      { page: 'sendAndReplyOption', answers: { sendAndReplyOption: 'SEND' } },
      {
        page: 'sendMessageMetadata',
        answers: {
          sendMessageMetadata: {
            recipientRoleType: message.recipientRoleType,
            isUrgent: 'No',
            subjectType: message.subjectType,
            subject: message.subject,
          },
        },
      },
      { page: 'sendMessageContent', answers: { sendMessageContent: message.content } },
    ]);
    console.log(`SEND_AND_REPLY (SEND) submitted through the API on case ${caseId}`);
  }

  // The event's first callback lists the case's messages (messagesToReplyTo), named by subject and when they were sent.
  // Choosing one runs the page's mid event callback, which fills in the message's history for the next page.
  async reply(caseId: string, reply: MessageReply) {
    await this.ccdApiHelper.submitEventThroughPages(judgeCredentials, 'SEND_AND_REPLY', caseId, [
      {
        page: 'sendAndReplyOption',
        answers: (data) => {
          const listItems = data.messagesToReplyTo?.list_items ?? [];
          const message = listItems.find((item) => item.label.startsWith(`${reply.subject},`));
          expect(message, `No message with the subject "${reply.subject}" to reply to (the messages are ${listItems.map((item) => item.label).join('; ')})`).toBeDefined();
          return { sendAndReplyOption: 'REPLY', messagesToReplyTo: { list_items: listItems, value: message } };
        },
      },
      { page: 'replyToMessage', answers: { messageReplyMetadata: { isUrgent: 'No', messageContent: reply.content } } },
    ]);
    console.log(`SEND_AND_REPLY (REPLY) submitted through the API on case ${caseId}`);
  }
}
