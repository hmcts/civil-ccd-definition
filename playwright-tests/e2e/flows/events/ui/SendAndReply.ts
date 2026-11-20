import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import { MessageReply, MessageToSend } from '../shared_api_ui/sendAndReplySpecs.ts';

// Court staff and judges sending each other messages about a case (event SEND_AND_REPLY, "Send and reply to messages").
// The messages are only seen by court staff and judges, on the case's Messages tab. The event leaves the case in its
// state. Sending a message to a judge creates a "Review message" task for judges, which replying completes.
export class SendAndReply {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  // Send a message: who it is for and what it is about, then the message itself
  async send(message: MessageToSend) {
    await this.chooseOption('SEND');

    await this.page.locator(`#sendMessageMetadata_recipientRoleType-${message.recipientRoleType}`).check();
    await this.page.locator('#sendMessageMetadata_isUrgent_No').check();
    await this.page.locator(`#sendMessageMetadata_subjectType-${message.subjectType}`).check();
    await this.page.locator('#sendMessageMetadata_subject').fill(message.subject);
    await this.pageHelper.continueToNextPage();

    await this.page.locator('#sendMessageContent').fill(message.content);
    await this.pageHelper.continueToNextPage();

    await this.submitAndConfirm('Your message has been sent');
  }

  // Reply to a message: choose it from the list (named by its subject and when it was sent), which shows its history on
  // the next page, then write the reply
  async reply(reply: MessageReply) {
    await this.chooseOption('REPLY');

    const messages = this.page.locator('#messagesToReplyTo');
    const option = messages.locator('option', { hasText: reply.subject });
    await expect(option, `No message with the subject "${reply.subject}" to reply to`).toHaveCount(1);
    await messages.selectOption({ label: (await option.innerText()).trim() });
    await this.pageHelper.continueToNextPage();

    // The page shows the message in a table (the page also holds a hidden copy of the history, so match the cell)
    await expect(this.page.getByRole('cell', { name: reply.subject, exact: true })).toBeVisible();
    await this.page.locator('#messageReplyMetadata_isUrgent_No').check();
    await this.page.locator('#messageReplyMetadata_messageContent').fill(reply.content);
    await this.pageHelper.continueToNextPage();

    await this.submitAndConfirm('Reply sent');
  }

  private async chooseOption(option: 'SEND' | 'REPLY') {
    await this.pageHelper.selectNextStep('Send and reply to messages');

    await this.page.locator(`#sendAndReplyOption-${option}`).check();
    // Replying needs the list of messages, which only shows once the option is chosen
    if (option === 'SEND') {
      await this.pageHelper.continueToNextPage();
    }
  }

  // Check your answers and submit, then close the confirmation
  private async submitAndConfirm(confirmationHeading: string) {
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText(confirmationHeading);
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
