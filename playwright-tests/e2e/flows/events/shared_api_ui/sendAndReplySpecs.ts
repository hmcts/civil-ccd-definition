// The message the hearing centre admin sends a district judge with "Send and reply to messages" (SEND_AND_REPLY), and
// the judge's reply, shared by the UI and API versions of the event. The subject carries the time so each run's message
// can be told apart on the list of messages to reply to.
export type MessageToSend = {
  recipientRoleType: 'DISTRICT_JUDGE';
  subjectType: 'HEARING';
  subject: string;
  content: string;
};

export type MessageReply = {
  // The subject of the message being replied to, which names it on the list of messages
  subject: string;
  content: string;
};

export function messageToSend(): MessageToSend {
  return {
    recipientRoleType: 'DISTRICT_JUDGE',
    subjectType: 'HEARING',
    subject: `Playwright message ${Date.now()}`,
    content: 'Please could a judge look at the hearing arrangements for this claim.',
  };
}

export function replyTo(message: MessageToSend): MessageReply {
  return {
    subject: message.subject,
    content: 'The hearing arrangements are fine, no changes are needed.',
  };
}

// How civil-service saves a message (an element of the case's messages): the recipient chosen on the page becomes a
// role pool, and the hearing centre admin's role (hearing-centre-admin) the ADMIN pool
export function expectedSentMessage(message: MessageToSend) {
  return {
    subject: message.subject,
    subjectType: message.subjectType,
    messageContent: message.content,
    isUrgent: 'No',
    recipientRoleType: 'JUDICIAL_DISTRICT',
    senderRoleType: 'ADMIN',
  };
}

// A reply replaces the message's content and sender, goes back to the original sender's role (ADMIN), and moves the
// original message into its history
export function expectedRepliedMessage(message: MessageToSend, reply: MessageReply) {
  return {
    subject: message.subject,
    messageContent: reply.content,
    recipientRoleType: 'ADMIN',
    history: [{ value: { messageContent: message.content, senderRoleType: 'ADMIN', recipientRoleType: 'JUDICIAL_DISTRICT' } }],
  };
}
